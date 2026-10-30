import type { PracticeModeId } from '@/entities/PracticeMode/model/practiceMode'
import type { PracticeQuestionEntry } from '../model/types'
import Flashcards from './Flashcards/Flashcards'
import Listening from './Listening/Listening'
import { isListeningCardPlayable } from './Listening/model/listening'
import Matching from './Matching/Matching'
import { buildMatchingGroups } from './Matching/model/matching'

// вопрос каждого готового режима практики. Новый режим: описание в
// entities/PracticeMode (PRACTICE_MODES, без isComingSoon) + запись здесь:
// kind 'card' — вопрос по одной карточке (PracticeQuestionProps), kind
// 'group' — по группе карточек из buildGroups (PracticeGroupQuestionProps).
// Чтобы режим считался в достижениях, бэкенд должен принимать его mode и он
// должен быть записан в PRACTICE_METRIC_MODES (model/practiceSession).
// Режима нет в списке — сессия показывает «ничего не найдено» и кнопку «Назад»
export const PRACTICE_QUESTIONS: Partial<
  Record<PracticeModeId, PracticeQuestionEntry>
> = {
  flashcards: { kind: 'card', Question: Flashcards },
  matching: {
    kind: 'group',
    Question: Matching,
    buildGroups: buildMatchingGroups,
    isTimed: true,
  },
  listening: {
    kind: 'card',
    Question: Listening,
    isCardPlayable: isListeningCardPlayable,
  },
}
