// GET /app-config — свободный JSON, который редактируется в админке. Здесь
// описаны только поля, которые реально читает клиент; каждое поле может
// отсутствовать (старый/пустой конфиг), поэтому все они опциональны и у
// каждого потребителя есть локальный фолбэк. IAplication из appSlice с
// бэкендом не синхронизируется — данные конфига читаются только отсюда

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

// id создаётся админкой и бывает как числом, так и строкой ("temp-...")
export type AppConfigSocial = {
  id: number | string
  key?: string
  link: string
  icon: string
  name: string
}

// blockName/text/punkts — ключи перевода (например settingsScreen.about.2.text)
export type AppConfigAboutBlock = {
  id: number | string
  blockName?: string
  text?: string
  punkts?: string[]
}

// label — ключ перевода, value — один из ShowVariantListVale (остальные
// значения клиент игнорирует)
export type AppConfigShowVariant = {
  label: string
  value: string
}

export type AppConfigDTO = {
  // ключ может отсутствовать в старом закэшированном конфиге — трактуем это
  // как «фича выключена»
  year_in_review?: YearInReviewConfig
  appName?: string
  socials?: AppConfigSocial[]
  about?: {
    blocks?: AppConfigAboutBlock[]
  }
  showVariantsList?: AppConfigShowVariant[]
  privacy_policy_link?: string
}
