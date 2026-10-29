import type { PracticeModeId } from '@/entities/PracticeMode/model/practiceMode'
import type { PracticeQuestionEntry } from '../model/types'
import Flashcards from './Flashcards/Flashcards'
import Matching from './Matching/Matching'
import { buildMatchingGroups } from './Matching/model/matching'

// вопрос каждого готового режима практики. Новый режим: описание в
// entities/PracticeMode (PRACTICE_MODES, без isComingSoon) + запись здесь:
// kind 'card' — вопрос по одной карточке (PracticeQuestionProps), kind
// 'group' — по группе карточек из buildGroups (PracticeGroupQuestionProps).
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
}
