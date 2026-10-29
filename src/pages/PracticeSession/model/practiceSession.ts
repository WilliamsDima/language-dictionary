import type { IItem } from '@/entities/Item/model/item'
import type { CardsLimitValue } from '@/shared/store/slice/itemsSlice'
import { shuffleArray } from '@/shared/helpers/shuffleArray'
import type { PracticeQuestionEntry } from './types'

const SECOND_MS = 1000
const MINUTE_S = 60

// набор карточек сессии: случайный порядок, не больше limit
export const buildSessionCards = (
  items: IItem[],
  limit: CardsLimitValue
): IItem[] => {
  const shuffled = shuffleArray(items)

  return limit === 'ALL' ? shuffled : shuffled.slice(0, limit)
}

// шаги сессии: группы режима с kind 'group', иначе по карточке на шаг
export const buildSessionSteps = (
  cards: IItem[],
  entry: PracticeQuestionEntry | undefined
): IItem[][] =>
  entry?.kind === 'group' ? entry.buildGroups(cards) : cards.map((it) => [it])

// следующий индекс после ответа на вопрос currentIndex. Повторный вызов с
// тем же currentIndex (двойное нажатие до перерисовки) не перескакивает
// через карточку
export const getNextQuestionIndex = (
  prevIndex: number,
  answeredIndex: number
): number => (prevIndex === answeredIndex ? prevIndex + 1 : prevIndex)

// длительность для таймера и итога: «m:ss» (минуты не ограничены)
export const formatDuration = (ms: number): string => {
  const totalSeconds = Math.max(0, Math.floor(ms / SECOND_MS))
  const minutes = Math.floor(totalSeconds / MINUTE_S)
  const seconds = totalSeconds % MINUTE_S

  return `${minutes}:${String(seconds).padStart(2, '0')}`
}
