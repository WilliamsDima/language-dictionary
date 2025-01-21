import { describe, expect, it } from '@jest/globals'
import { formatNumberWithSpaces } from './numberFormats'

describe('formatNumberWithSpaces', () => {
  it('проверка на короткое число, пробела не должно быть', () => {
    const result = formatNumberWithSpaces(100)
    expect(result).toBe('100')
  })
  it('проверка на длинное число, должны быть пробелы', () => {
    const result = formatNumberWithSpaces(10000)
    expect(result).toBe('10 000')
  })
  it('проверка на передачу числа ввиде строрки', () => {
    const result = formatNumberWithSpaces('10000' as any)
    expect(result).toBe('10 000')
  })
  it('проверка на передачу строрки', () => {
    const result = formatNumberWithSpaces('рапрап' as any)
    expect(result).toBe('рапрап')
  })
})
