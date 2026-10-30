import type { I18NKeys } from '@/shared/i18n/types'

export type PracticeModeId =
  | 'flashcards'
  | 'matching'
  | 'listening'
  | 'sentence'
  | 'pronunciation'

// описание режима практики для списка во вкладке «Практика» и движка сессии
// (pages/PracticeSession). Вопрос режима — отдельный компонент, он
// подключается в pages/PracticeSession/modes/practiceQuestions.ts
export type PracticeModeConfig = {
  id: PracticeModeId
  icon: string
  title: I18NKeys
  description: I18NKeys
  // минимум карточек, без которого режим недоступен: для режимов с выбором
  // из вариантов нужны неправильные варианты из других карточек
  minCards: number
  // режим ещё не готов — в списке показывается неактивным с меткой «Скоро»
  isComingSoon?: boolean
}

// варианты ответа в режимах с выбором: правильный + 3 неправильных
const MULTIPLE_CHOICE_MIN_CARDS = 4

export const PRACTICE_MODES: PracticeModeConfig[] = [
  {
    id: 'flashcards',
    icon: '🃏',
    title: 'practiceScreen.modes.flashcards.title',
    description: 'practiceScreen.modes.flashcards.description',
    minCards: 1,
  },
  {
    id: 'matching',
    icon: '🧩',
    title: 'practiceScreen.modes.matching.title',
    description: 'practiceScreen.modes.matching.description',
    minCards: 5,
  },
  {
    id: 'listening',
    icon: '🎧',
    title: 'practiceScreen.modes.listening.title',
    description: 'practiceScreen.modes.listening.description',
    minCards: MULTIPLE_CHOICE_MIN_CARDS,
  },
  {
    id: 'sentence',
    icon: '🧱',
    title: 'practiceScreen.modes.sentence.title',
    description: 'practiceScreen.modes.sentence.description',
    minCards: 1,
    isComingSoon: true,
  },
  {
    id: 'pronunciation',
    icon: '🎙️',
    title: 'practiceScreen.modes.pronunciation.title',
    description: 'practiceScreen.modes.pronunciation.description',
    minCards: 1,
    isComingSoon: true,
  },
]

export const getPracticeMode = (
  id: PracticeModeId
): PracticeModeConfig | undefined => PRACTICE_MODES.find((it) => it.id === id)

// хватает ли карточек для режима (в списке режимов — всех карточек
// пользователя, в сессии — карточек под выбранный язык и статус)
export const hasEnoughCardsForMode = (
  mode: PracticeModeConfig,
  cardsCount: number
): boolean => cardsCount >= mode.minCards
