// значения type маппятся бэкендом (MetricsHandler.LogEvent) на инкремент
// соответствующего столбца в user_metrics_daily; здесь заведён только тот
// enum-литерал, который сейчас реально используется клиентом.
// card_created/card_reviewed/app_open больше не шлются клиентом — бэкенд
// теперь считает их сам внутри уже существующих хендлеров и отклонит эти
// типы события 400-й ошибкой
export type MetricEventType = 'training_opened'

export type LogEventPayload = {
  type: MetricEventType
  meta?: Record<string, unknown>
}

export type YearStatsMetric = {
  total: number
  // 0-индексированный массив из 12 значений, index 0 = январь
  byMonth: number[]
}

export type YearStatsTotalOnly = {
  total: number
}

export type YearStatsValue = {
  value: number
}

export type YearStatsLanguage = {
  code: string
  name: string
}

export type YearStatsResponse = {
  cardsAdded: YearStatsMetric
  cardsLearned: YearStatsMetric
  practiceSessions: YearStatsTotalOnly
  bestStreak: YearStatsValue
  dailyTasksCompleted: YearStatsTotalOnly
  appOpens: YearStatsMetric
  cardsReviewed: YearStatsTotalOnly
  languages: YearStatsLanguage[]
}
