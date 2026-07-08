import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { appStorage } from '../storage/mmkv.storage'
import { getAsyncLocal } from './asyncStorage'

jest.mock('../storage/mmkv.storage', () => ({
  appStorage: {
    getString: jest.fn(),
  },
}))

describe('getAsyncLocal', () => {
  const mockKey = 'testKey'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('должна возвращать распарсенное значение, если ключ существует и его значение строка', async () => {
    const mockValue = JSON.stringify({ data: 'testData' })

    const getItemMock = jest
      .spyOn(appStorage, 'getString')
      .mockReturnValueOnce(mockValue)

    const result = await getAsyncLocal(mockKey)

    // проверяем что результат равен { data: 'testData' }
    expect(result).toEqual({ data: 'testData' })
    expect(getItemMock).toHaveBeenCalledWith(mockKey)
    getItemMock.mockRestore()
  })

  it('должна выбрасывать ошибку, если ключ отсутствует', async () => {
    const getItemMock = jest
      .spyOn(appStorage, 'getString')
      .mockReturnValueOnce(undefined)

    // вызываем функцию с отсутствующим ключом
    await expect(getAsyncLocal(null as any)).rejects.toThrowError(
      'Key is not provided'
    )

    // проверяем, что метод был вызван с null но функция не завершилась успешно
    expect(getItemMock).not.toHaveBeenCalledWith()

    getItemMock.mockRestore()
  })

  it('должна выбрасывать ошибку при некорректном JSON', async () => {
    const invalidJsonKey = 'someKey'

    const mockValue = 'invalid JSON' // невалидный JSON
    const getItemMock = jest
      .spyOn(appStorage, 'getString')
      .mockReturnValueOnce(mockValue)

    // вызываем функцию, которая должна выбросить ошибку при попытке распарсить невалидный JSON
    await expect(getAsyncLocal(invalidJsonKey)).rejects.toThrowError(
      SyntaxError
    )

    expect(getItemMock).toHaveBeenCalledWith(invalidJsonKey)

    // восстанавливаем оригинальный метод
    getItemMock.mockRestore()
  })

  it('должна возвращать ошибку, если ключ по этому ключу ничего не найдено', async () => {
    const getItemMock = jest
      .spyOn(appStorage, 'getString')
      .mockReturnValueOnce(undefined)

    // вызываем функцию при отсутствии значения в storage
    await expect(getAsyncLocal(mockKey)).rejects.toThrowError(
      `There is no such key as ${mockKey}`
    )

    expect(getItemMock).toHaveBeenCalledWith(mockKey)
    getItemMock.mockRestore()
  })
})
