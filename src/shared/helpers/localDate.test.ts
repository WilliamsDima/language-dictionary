import { describe, expect, it } from '@jest/globals'
import { getLocalDateString } from './localDate'

describe('getLocalDateString', () => {
  it('должен форматировать дату как YYYY-MM-DD', () => {
    const date = new Date(2026, 6, 3) // 3 июля 2026
    expect(getLocalDateString(date)).toBe('2026-07-03')
  })

  it('должен дополнять месяц и день нулём слева', () => {
    const date = new Date(2026, 0, 5) // 5 января 2026
    expect(getLocalDateString(date)).toBe('2026-01-05')
  })

  it('должен использовать текущую дату по умолчанию', () => {
    const now = new Date()
    const expected = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

    expect(getLocalDateString()).toBe(expected)
  })

  it('не должен использовать UTC-представление даты', () => {
    // локальная полночь 31 декабря — в UTC+ смещении toISOString() уже дал бы 1 января
    const date = new Date(2025, 11, 31, 0, 30)
    expect(getLocalDateString(date)).toBe('2025-12-31')
  })
})
