// GET /app-config хранит гораздо больше полей (developer/about/socials/...),
// но на клиенте сейчас реально используется только year_in_review — остальные
// поля этим типом сознательно не описываются, чтобы не тащить за собой
// давно не синхронизированный с бэком IAplication из appSlice

export type YearInReviewSlideId =
  | 'intro'
  | 'cards_added'
  | 'cards_learned'
  | 'practice_sessions'
  | 'streak'
  | 'daily_tasks'
  | 'app_opens'
  | 'cards_reviewed'
  | 'languages'
  | 'outro'

export type YearInReviewTranslation = {
  title: string
  description: string
}

export type YearInReviewSlideConfig = {
  id: YearInReviewSlideId
  enabled: boolean
  sort_order: number
  // ключ — код языка перевода (ru, en, ...), под конкретную локаль перевода
  // может не быть — резолвится через resolveYearInReviewTranslation
  translations: Record<string, YearInReviewTranslation | undefined>
}

export type YearInReviewWindow = {
  start_month: number
  start_day: number
  end_month: number
  end_day: number
  end_hour: number
  end_minute: number
}

export type YearInReviewConfig = {
  window: YearInReviewWindow
  slides: YearInReviewSlideConfig[]
}

export type AppConfigDTO = {
  // ключ может отсутствовать в старом закэшированном конфиге — трактуем это
  // как «фича выключена»
  year_in_review?: YearInReviewConfig
}
