import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import AsyncStorage from '@react-native-async-storage/async-storage' // Мок AsyncStorage
import { getAsyncLocal } from './asyncStorage'

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}))

describe('getAsyncLocal', () => {
  const mockKey = 'testKey'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('должна возвращать распарсенное значение, если ключ существует и его значение строка', async () => {
    const mockValue = JSON.stringify({ data: 'testData' })

    // имитируем вызов AsyncStorage.getItem
    const getItemMock = jest
      .spyOn(AsyncStorage, 'getItem')
      .mockResolvedValueOnce(mockValue)

    // вызываем функцию которая имитирует вызов AsyncStorage.getItem getItemMock
    const result = await getAsyncLocal(mockKey)

    // проверяем что результат равен { data: 'testData' }
    expect(result).toEqual({ data: 'testData' })
    // проверяем что getItem был вызван с mockKey
    expect(getItemMock).toHaveBeenCalledWith(mockKey)
    // восстанавливаем оригинальный метод AsyncStorage.getItem
    getItemMock.mockRestore()
  })

  it('должна выбрасывать ошибку, если ключ отсутствует', async () => {
    // имитируем вызов AsyncStorage.getItem
    const getItemMock = jest
      .spyOn(AsyncStorage, 'getItem')
      .mockResolvedValueOnce(null) // здесь вернется null

    // вызываем функцию которая имитирует вызов AsyncStorage.getItem с отсутствующим ключом
    await expect(getAsyncLocal(null as any)).rejects.toThrowError(
      'Key is not provided'
    )

    // проверяем, что метод был вызван с null но функция не завершилась успешно
    expect(getItemMock).not.toHaveBeenCalledWith()

    // восстанавливаем оригинальный метод AsyncStorage.getItem
    getItemMock.mockRestore()
  })

  it('должна выбрасывать ошибку при некорректном JSON', async () => {
    const mockKey = 'someKey'

    // создаём mock для AsyncStorage.getItem, который возвращает некорректный JSON
    const mockValue = 'invalid JSON' // невалидный JSON
    const getItemMock = jest
      .spyOn(AsyncStorage, 'getItem')
      .mockResolvedValueOnce(mockValue)

    // вызываем функцию, которая должна выбросить ошибку при попытке распарсить невалидный JSON
    await expect(getAsyncLocal(mockKey)).rejects.toThrowError(SyntaxError)

    // проверяем, что метод AsyncStorage.getItem был вызван с правильным ключом
    expect(getItemMock).toHaveBeenCalledWith(mockKey)

    // восстанавливаем оригинальный метод
    getItemMock.mockRestore()
  })

  it('должна возвращать ошибку, если ключ по этому ключу ничего не найдено', async () => {
    // имитируем вызов AsyncStorage.getItem
    const getItemMock = jest
      .spyOn(AsyncStorage, 'getItem')
      .mockResolvedValueOnce(null)

    // вызываем функцию которая имитирует вызов AsyncStorage.getItem getItemMock
    await expect(getAsyncLocal(mockKey)).rejects.toThrowError(
      `There is no such key as ${mockKey}`
    )

    // проверяем что getItem был вызван с mockKey
    expect(getItemMock).toHaveBeenCalledWith(mockKey)
    // восстанавливаем оригинальный метод AsyncStorage.getItem
    getItemMock.mockRestore()
  })
})
