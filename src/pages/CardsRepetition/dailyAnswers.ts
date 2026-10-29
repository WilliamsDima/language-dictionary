import type { DailyChallengeResult } from '@/shared/API/services/streak/types'
import {
  AnswersByCard,
  AnswersStats,
  getAnswersStats,
  getSuccessPercent,
} from '@/shared/helpers/answersStats'

// ответы задания дня по id карточки: true — «Помню», false — «Не помню»
export type DailyAnswers = AnswersByCard

export type DailyAnswersStats = AnswersStats

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

export const getDailyAnswersStats = getAnswersStats

// доля ответов «Помню» в процентах, округлённая до целого (0, если ответов нет)
export const getDailySuccessPercent = getSuccessPercent

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
