export enum LOCAL_KEYS {
  themeApp = 'themeApp',
  saveDate = 'saveDate',
  timeSpent = 'timeSpent',
  watchYearResult = 'watchYearResult',
  appLanguage = 'appLanguage', // en,ru ...
  showVariantList = 'showVariantList',
  // versionName релиза, отложенного кнопкой «Позже» в модалке обновления
  skippedUpdateVersion = 'skippedUpdateVersion',
  // системный диалог уведомлений больше не показывается (never_ask_again) —
  // при включении напоминаний сразу ведём в настройки телефона
  notificationPermissionBlocked = 'notificationPermissionBlocked',
  // предложение включить напоминания после первого задания дня уже показано
  reminderPromptShown = 'reminderPromptShown',
}
