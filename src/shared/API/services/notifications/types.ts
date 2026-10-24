// язык текста push-уведомления — бэкенд поддерживает только ru/en
export type DeviceLocale = 'ru' | 'en'

// PUT /me/devices — upsert FCM-токена устройства (идемпотентный)
export type RegisterDevicePayload = {
  token: string
  // IANA-таймзона устройства (Europe/Moscow): бэкенд шлёт напоминание
  // в daily_reminder_time по местному времени пользователя
  timezone: string
  locale: DeviceLocale
  // versionName установленной сборки (DeviceInfo.getVersion()): бэкенд не
  // шлёт пуш «Доступно обновление» устройствам, уже стоящим на этой версии
  app_version?: string
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
  // пуш о выходе новой версии APK
  app_update_enabled: boolean
}

// PUT /me/notification-settings — частичное обновление: передаём только
// меняемый флаг (хотя бы один, пустой объект — 400), ответ — полный объект
// настроек
export type UpdateNotificationSettingsPayload =
  | { daily_reminder_enabled: boolean; app_update_enabled?: boolean }
  | { daily_reminder_enabled?: boolean; app_update_enabled: boolean }
