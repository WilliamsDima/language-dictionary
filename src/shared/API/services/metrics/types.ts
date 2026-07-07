// значения type маппятся бэкендом (MetricsHandler.LogEvent) на инкремент
// соответствующего столбца в user_metrics_daily; здесь заведён только тот
// enum-литерал, который сейчас реально используется клиентом
export type MetricEventType = 'training_opened' | 'card_created'

export type LogEventPayload = {
  type: MetricEventType
  meta?: Record<string, unknown>
}
