import type {
  YearInReviewSlideConfig,
  YearInReviewTranslation,
  YearInReviewWindow,
} from '@/shared/API/services/appConfig/types'

// window описывает повторяющееся ежегодное окно показа по правилу
// месяц/день (не абсолютная дата) — админ настраивает его один раз, и оно
// продолжает работать в последующие годы без повторного ввода даты.
// Поддерживает как обычный диапазон в пределах года (start раньше end),
// так и диапазон, оборачивающийся через новый год (start > end,
// например 28 декабря — 3 января)
export const isWithinYearInReviewWindow = (
  window: YearInReviewWindow | null | undefined,
  date: Date
): boolean => {
  if (!window) return false

  const month = date.getMonth() + 1
  const day = date.getDate()
  const current = month * 100 + day
  const start = window.start_month * 100 + window.start_day
  const end = window.end_month * 100 + window.end_day

  const withinRange =
    start <= end
      ? current >= start && current <= end
      : current >= start || current <= end

  if (!withinRange) return false

  const isEndDay = month === window.end_month && day === window.end_day
  if (!isEndDay) return true

  const minutesNow = date.getHours() * 60 + date.getMinutes()
  const minutesLimit = window.end_hour * 60 + window.end_minute

  return minutesNow <= minutesLimit
}

const FALLBACK_TRANSLATION: YearInReviewTranslation = {
  title: '',
  description: '',
}

// порядок фолбэка: текущая локаль устройства -> ru -> en -> пустой текст
// (конфиг может не содержать перевод под конкретный код языка)
export const resolveYearInReviewTranslation = (
  slide: YearInReviewSlideConfig,
  locale: string
): YearInReviewTranslation => {
  return (
    slide.translations[locale] ??
    slide.translations.ru ??
    slide.translations.en ??
    FALLBACK_TRANSLATION
  )
}
