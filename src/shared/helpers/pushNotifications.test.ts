import { isDailyReminderPush, toDeviceLocale } from './pushNotifications'

describe('toDeviceLocale', () => {
  it('keeps ru', () => {
    expect(toDeviceLocale('ru')).toBe('ru')
  })

  it('maps en and other languages to en', () => {
    expect(toDeviceLocale('en')).toBe('en')
    expect(toDeviceLocale('de')).toBe('en')
  })

  it('falls back to en without a language', () => {
    expect(toDeviceLocale(null)).toBe('en')
    expect(toDeviceLocale(undefined)).toBe('en')
  })
})

describe('isDailyReminderPush', () => {
  it('detects the daily reminder push', () => {
    expect(
      isDailyReminderPush({ type: 'daily_reminder', date: '2026-10-13' })
    ).toBe(true)
  })

  it('ignores other or empty payloads', () => {
    expect(isDailyReminderPush({ type: 'other' })).toBe(false)
    expect(isDailyReminderPush({})).toBe(false)
    expect(isDailyReminderPush(undefined)).toBe(false)
    expect(isDailyReminderPush(null)).toBe(false)
  })
})
