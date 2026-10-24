import type { DeviceLocale } from '@/shared/API/services/notifications/types'

// время по умолчанию, пока GET /me/notification-settings не ответил
export const DEFAULT_DAILY_REMINDER_TIME = '22:00'

export const DAILY_REMINDER_PUSH_TYPE = 'daily_reminder'

// бэкенд локализует текст пуша только на ru/en — остальные языки интерфейса
// получают английский текст
export const toDeviceLocale = (languageCode?: string | null): DeviceLocale =>
  languageCode === 'ru' ? 'ru' : 'en'

// пуш «Доступна новая версия» (data.version — versionName релиза); бэкенд
// шлёт его в Android-канал app_update
export const APP_UPDATE_PUSH_TYPE = 'app_update'

export const isDailyReminderPush = (
  data?: Record<string, unknown> | null
): boolean => data?.type === DAILY_REMINDER_PUSH_TYPE

export const isAppUpdatePush = (
  data?: Record<string, unknown> | null
): boolean => data?.type === APP_UPDATE_PUSH_TYPE

export type PushToastContent = {
  title?: string
  body: string
}

// что показать тостом, если пуш пришёл при открытом приложении.
// Ежедневное напоминание в foreground не показываем (пользователь и так в
// приложении); пуш об обновлении вместо тоста сразу открывает модалку
// обновления (useOpenAppUpdatePush); остальные типы — admin_message и
// будущие/неизвестные — показываем, если в пуше есть текст. Без body
// заголовок становится текстом
export const getForegroundPushToast = (
  notification?: { title?: string; body?: string } | null,
  data?: Record<string, unknown> | null
): PushToastContent | null => {
  if (isDailyReminderPush(data) || isAppUpdatePush(data)) return null

  const title = notification?.title?.trim()
  const body = notification?.body?.trim()

  if (body) return title ? { title, body } : { body }
  if (title) return { body: title }

  return null
}
