// CardDTO переиспользуется из существующего описания ответа /cards, а не
// дублируется — daily-challenge отдаёт карточки в том же формате.
// NOTE: единственное исключение из порядка слоёв FSD в проекте — это
// type-only импорт (стирается на этапе компиляции, не создаёт рантайм-связи
// shared -> pages), сделанный сознательно, чтобы не плодить второй тип карточки.
import type { CardDTO } from '@/pages/MainScreen/api/types'

export type StreakStatus = {
  current_streak: number
  longest_streak: number
  completed_today: boolean
  last_completed_date: string | null
}

export type CompleteStreakResponse = StreakStatus & {
  previous_streak: number
}

export type DailyChallengeResponse = {
  cards: CardDTO[]
  completed_today: boolean
}
