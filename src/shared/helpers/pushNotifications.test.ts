import {
  getForegroundPushToast,
  isAppUpdatePush,
  isDailyReminderPush,
  toDeviceLocale,
} from './pushNotifications'

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

describe('isAppUpdatePush', () => {
  it('detects the app update push', () => {
    expect(isAppUpdatePush({ type: 'app_update', version: '2.4.0' })).toBe(true)
  })

  it('ignores other or empty payloads', () => {
    expect(isAppUpdatePush({ type: 'daily_reminder' })).toBe(false)
    expect(isAppUpdatePush({})).toBe(false)
    expect(isAppUpdatePush(undefined)).toBe(false)
    expect(isAppUpdatePush(null)).toBe(false)
  })
})

describe('getForegroundPushToast', () => {
  const notification = { title: 'Привет', body: 'Новые карточки уже доступны' }

  it('shows an admin message with title and body', () => {
    expect(
      getForegroundPushToast(notification, { type: 'admin_message' })
    ).toEqual({ title: 'Привет', body: 'Новые карточки уже доступны' })
  })

  it('shows unknown push types and pushes without data', () => {
    expect(getForegroundPushToast(notification, { type: 'other' })).toEqual({
      title: 'Привет',
      body: 'Новые карточки уже доступны',
    })
    expect(getForegroundPushToast(notification, undefined)).toEqual({
      title: 'Привет',
      body: 'Новые карточки уже доступны',
    })
  })

  it('skips the daily reminder', () => {
    expect(
      getForegroundPushToast(notification, { type: 'daily_reminder' })
    ).toBeNull()
  })

  it('skips the app update push (it opens the update modal instead)', () => {
    expect(
      getForegroundPushToast(notification, {
        type: 'app_update',
        version: '2.4.0',
      })
    ).toBeNull()
  })

  it('uses the title as text when there is no body', () => {
    expect(
      getForegroundPushToast({ title: ' Привет ' }, { type: 'admin_message' })
    ).toEqual({ body: 'Привет' })
    expect(
      getForegroundPushToast({ body: 'Текст', title: '  ' }, undefined)
    ).toEqual({ body: 'Текст' })
  })

  it('skips pushes without text', () => {
    expect(getForegroundPushToast(undefined, { type: 'admin_message' })).toBeNull()
    expect(getForegroundPushToast({ title: ' ', body: '' }, {})).toBeNull()
    expect(getForegroundPushToast(null, null)).toBeNull()
  })
})
