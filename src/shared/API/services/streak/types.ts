// CardDTO переиспользуется из существующего описания ответа /cards, а не
// дублируется — daily-challenge отдаёт карточки в том же формате.
// NOTE: единственное исключение из порядка слоёв FSD в проекте — это
// type-only импорт (стирается на этапе компиляции, не создаёт рантайм-связи
// shared -> pages), сделанный сознательно, чтобы не плодить второй тип карточки.
import type { CardDTO } from '@/pages/MainScreen/api/types'

// none — ни разу не выполнял; completed — выполнено сегодня; active —
// выполнено вчера; frozen — пропуск покрыт заморозками, но с тех пор задание
// ещё не выполнялось; broken — пропуск больше, чем заморозок (серия = 0)
export type StreakState = 'none' | 'completed' | 'active' | 'frozen' | 'broken'

export type StreakStatus = {
  current_streak: number
  longest_streak: number
  completed_today: boolean
  last_completed_date: string | null
  // поля заморозок необязательны: бэкенд без заморозок их не отдаёт, и тогда
  // клиент просто не показывает ничего, связанного с заморозками
  // в состоянии frozen уже за вычетом заморозок, которые уйдут на пропуск
  freezes_available?: number
  max_freezes?: number
  streak_state?: StreakState
  // > 0 только в состоянии frozen
  frozen_days_pending?: number
  // следующее кратное 30 значение серии; null — заморозок уже максимум
  next_freeze_at_streak?: number | null
  // даты уже потраченных заморозок, о которых пользователю ещё не сказали
  // (старые первыми) — после показа модалки подтверждаются через
  // POST /streak/freezes/seen
  unseen_frozen_days?: string[]
}

export type CompleteStreakResponse = StreakStatus & {
  previous_streak: number
  freeze_earned?: boolean
  frozen_days_used?: number
}

export type MarkFrozenDaysSeenResponse = {
  unseen_frozen_days: string[]
}

// данные модалки «Стрик заморожен»: dates — потраченные и ещё не показанные
// заморозки, streak — сохранённая ими серия, left — сколько заморозок осталось
export type StreakFrozenInfo = {
  dates: string[]
  streak: number
  left: number
}

// режимы задания дня, которые клиент уже умеет показывать; бэкенд меняет
// режим по кругу каждый день и со временем добавит новые (аудирование,
// произношение, сопоставление), поэтому в ответе поле — любая строка
export type DailyChallengeKnownMode = 'WORD_TO_TRANSLATE' | 'TRANSLATE_TO_WORD'

export type DailyChallengeResponse = {
  cards: CardDTO[]
  completed_today: boolean
  // необязательно: старый бэкенд поле не отдаёт, незнакомое значение —
  // не ошибка, клиент откатывается на локальную настройку показа
  mode?: string
}
