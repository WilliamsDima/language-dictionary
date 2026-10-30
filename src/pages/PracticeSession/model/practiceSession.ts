import type { IItem } from '@/entities/Item/model/item'
import type { CardsLimitValue } from '@/shared/store/slice/itemsSlice'
import { shuffleArray } from '@/shared/helpers/shuffleArray'
import type { PracticeModeId } from '@/entities/PracticeMode/model/practiceMode'
import type {
  PracticeMetricMode,
  PracticeSessionCompletedEvent,
} from '@/shared/API/services/metrics/types'
import type { PracticeQuestionEntry } from './types'

const SECOND_MS = 1000
const MINUTE_S = 60

// какое значение mode режим отправляет в practice_session_completed. id режима
// не равен значению контракта автоматически: бэкенд отклонит незнакомый mode,
// поэтому для каждого режима решение записано явно (Record не даст его забыть).
// null — режим не считается: сначала его должен начать принимать бэкенд
const PRACTICE_METRIC_MODES: Record<PracticeModeId, PracticeMetricMode | null> =
  {
    flashcards: 'flashcards',
    matching: 'matching',
    listening: 'listening',
    sentence: null,
    pronunciation: null,
  }

// событие о пройденной сессии режима; null — режим отправлять нельзя
export const getSessionCompletedEvent = (
  modeId: PracticeModeId
): PracticeSessionCompletedEvent | null => {
  const mode = PRACTICE_METRIC_MODES[modeId]

  return mode ? { type: 'practice_session_completed', meta: { mode } } : null
}

// набор карточек сессии: случайный порядок, не больше limit
export const buildSessionCards = (
  items: IItem[],
  limit: CardsLimitValue
): IItem[] => {
  const shuffled = shuffleArray(items)

  return limit === 'ALL' ? shuffled : shuffled.slice(0, limit)
}

// карточки, по которым режим может составить вопрос (isCardPlayable); режимы
// без этого условия берут все
export const getPlayableCards = (
  cards: IItem[],
  pool: IItem[],
  entry: PracticeQuestionEntry | undefined
): IItem[] => {
  const isCardPlayable = entry?.kind === 'card' ? entry.isCardPlayable : undefined

  return isCardPlayable
    ? cards.filter((it) => isCardPlayable(it, pool))
    : cards
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
