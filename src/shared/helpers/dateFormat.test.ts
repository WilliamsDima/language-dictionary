import { describe, expect, it } from '@jest/globals'
import { dateFormat } from './dateFormat'

describe('dateFormat', () => {
  it('должен правильно форматировать дату для типа FULL', () => {
    const date = new Date(2023, 9, 5) // 5th October 2023
    const result = dateFormat({ date, type: 'FULL' })
    expect(result).toBe('05.10.2023')
  })

  it('должен возвращать undefined, если дата не указана', () => {
    const result = dateFormat({ type: 'FULL' })
    expect(result).toBeUndefined()
  })

  it('должен возвращать undefined для неподдерживаемых типов', () => {
    const result = dateFormat({
      date: new Date(),
      type: 'UNSUPPORTED' as 'FULL',
    })
    expect(result).toBeUndefined()
  })

  it('должен корректно обработать дату как число (таймстемп)', () => {
    const date = new Date(2023, 9, 5).getTime()
    const result = dateFormat({ date, type: 'FULL' })
    expect(result).toBe('05.10.2023')
  })

  it('должен возвращать undefined для некорректной даты', () => {
    const result = dateFormat({ date: 'invalid-date' as any, type: 'FULL' })
    expect(result).toBeUndefined()
  })

  it('должен корректно форматировать минимальную дату', () => {
    const date = new Date(1970, 0, 1) // 1st January 1970
    const result = dateFormat({ date, type: 'FULL' })
    expect(result).toBe('01.01.1970')
  })

  it('должен корректно форматировать максимальную дату', () => {
    const date = new Date(9999, 11, 31) // 31st December 9999
    const result = dateFormat({ date, type: 'FULL' })
    expect(result).toBe('31.12.9999')
  })
})
