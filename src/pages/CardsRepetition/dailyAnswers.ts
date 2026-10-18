import type { DailyChallengeResult } from '@/shared/API/services/streak/types'

// ответы задания дня по id карточки: true — «Помню», false — «Не помню»
export type DailyAnswers = Record<number, boolean>

export type DailyAnswersStats = {
  known: number
  unknown: number
}

type SlideWithItemId = {
  item: { id: number }
}

// тело POST /streak/daily-challenge/results — по одному ответу на карточку
export const toDailyChallengeResults = (
  answers: DailyAnswers
): DailyChallengeResult[] =>
  Object.entries(answers).map(([cardId, correct]) => ({
    card_id: Number(cardId),
    correct,
  }))

export const getDailyAnswersStats = (
  answers: DailyAnswers
): DailyAnswersStats =>
  Object.values(answers).reduce<DailyAnswersStats>(
    (acc, correct) =>
      correct
        ? { ...acc, known: acc.known + 1 }
        : { ...acc, unknown: acc.unknown + 1 },
    { known: 0, unknown: 0 }
  )

// индекс следующей неотвеченной карточки после fromIndex (по кругу —
// пропущенные свайпом карточки тоже нужно ответить); -1 — отвечены все
export const getNextUnansweredIndex = (
  slides: SlideWithItemId[],
  answers: DailyAnswers,
  fromIndex: number
): number => {
  const ordered = [
    ...slides
      .slice(fromIndex + 1)
      .map((slide, i) => ({ slide, index: fromIndex + 1 + i })),
    ...slides.slice(0, fromIndex + 1).map((slide, index) => ({ slide, index })),
  ]

  const next = ordered.find(({ slide }) => !(slide.item.id in answers))

  return next ? next.index : -1
}
