// язык текста push-уведомления — бэкенд поддерживает только ru/en
export type DeviceLocale = 'ru' | 'en'

// PUT /me/devices — upsert FCM-токена устройства (идемпотентный)
export type RegisterDevicePayload = {
  token: string
  // IANA-таймзона устройства (Europe/Moscow): бэкенд шлёт напоминание
  // в daily_reminder_time по местному времени пользователя
  timezone: string
  locale: DeviceLocale
}

// ответ — нормализованные бэкендом значения
export type DeviceResponse = RegisterDevicePayload

export type DeleteDeviceResponse = {
  deleted: boolean
}

export type NotificationSettings = {
  daily_reminder_enabled: boolean
  // "HH:MM" по местному времени, только для чтения
  daily_reminder_time: string
}

export type UpdateNotificationSettingsPayload = {
  daily_reminder_enabled: boolean
}
