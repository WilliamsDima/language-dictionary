import type { LottieViewProps } from 'lottie-react-native'
import type { YearInReviewSlideId } from '@/shared/API/services/appConfig/types'
import type { YearStatsResponse } from '@/shared/API/services/metrics/types'

export type YearInReviewSlideNumberData = {
  value: number
  byMonth?: number[]
}

// сопоставление фиксированного каталога id слайдов с полями ответа
// GET /stats/year — единственное место, которое должно знать про эту связь,
// сами шаблоны слайдов ничего не знают про конкретный id
export const getYearInReviewSlideNumberData = (
  id: YearInReviewSlideId,
  stats: YearStatsResponse | undefined
): YearInReviewSlideNumberData | null => {
  if (!stats) return null

  switch (id) {
    case 'cards_added':
      return { value: stats.cardsAdded.total, byMonth: stats.cardsAdded.byMonth }
    case 'cards_learned':
      return {
        value: stats.cardsLearned.total,
        byMonth: stats.cardsLearned.byMonth,
      }
    case 'app_opens':
      return { value: stats.appOpens.total, byMonth: stats.appOpens.byMonth }
    case 'practice_sessions':
      return { value: stats.practiceSessions.total }
    case 'streak':
      return { value: stats.bestStreak.value }
    case 'daily_tasks':
      return { value: stats.dailyTasksCompleted.total }
    case 'cards_reviewed':
      return { value: stats.cardsReviewed.total }
    default:
      return null
  }
}

// слайды с разбивкой по месяцам — единственные, для кого рендерится
// мини-график вместо простого большого числа
export const YEAR_IN_REVIEW_CHART_SLIDE_IDS = new Set<YearInReviewSlideId>([
  'cards_added',
  'cards_learned',
  'app_opens',
])

type LottieSource = LottieViewProps['source']

export const getYearInReviewSlideLottieSource = (
  id: YearInReviewSlideId
): LottieSource => {
  switch (id) {
    case 'cards_learned':
      return require('../../shared/json/graduation-hat.json')
    case 'practice_sessions':
      return require('../../shared/json/book.json')
    case 'streak':
      return require('../../shared/json/fire.json')
    case 'daily_tasks':
      return require('../../shared/json/calendar.json')
    case 'app_opens':
      return require('../../shared/json/rocket.json')
    case 'cards_reviewed':
      return require('../../shared/json/retry.json')
    case 'languages':
      return require('../../shared/json/brain.json')
    case 'cards_added':
    default:
      return require('../../shared/json/cards.json')
  }
}
