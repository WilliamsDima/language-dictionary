import type { DeviceLocale } from '@/shared/API/services/notifications/types'

// время по умолчанию, пока GET /me/notification-settings не ответил
export const DEFAULT_DAILY_REMINDER_TIME = '22:00'

export const DAILY_REMINDER_PUSH_TYPE = 'daily_reminder'

// бэкенд локализует текст пуша только на ru/en — остальные языки интерфейса
// получают английский текст
export const toDeviceLocale = (languageCode?: string | null): DeviceLocale =>
  languageCode === 'ru' ? 'ru' : 'en'

export const isDailyReminderPush = (
  data?: Record<string, unknown> | null
): boolean => data?.type === DAILY_REMINDER_PUSH_TYPE
