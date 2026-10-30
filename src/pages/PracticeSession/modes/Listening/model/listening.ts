import type { IItem } from '@/entities/Item/model/item'
import { shuffleArray } from '@/shared/helpers/shuffleArray'
import type { TextToSpeechResult } from '@/shared/helpers/textToSpeech'
import type { I18NKeys } from '@/shared/i18n/types'
import {
  getCardTranslationText,
  getCardWordText,
  toTextKey,
} from '../../../model/cardTexts'

// правильный вариант + 3 неправильных (minCards режима в entities/PracticeMode)
const WRONG_OPTIONS_COUNT = 3

export type ListeningOption = {
  // ключ сравнения текста — уникален среди вариантов вопроса
  key: string
  text: string
  isCorrect: boolean
}

export type ListeningOptionState = 'idle' | 'correct' | 'wrong'

// неправильные варианты для карточки — переводы других карточек того же
// языка, первые подходящие из candidates. Не годятся карточки с общим словом
// или переводом: при омонимах и синонимах такой вариант тоже был бы верным
const pickWrongOptions = (
  card: IItem,
  candidates: IItem[]
): ListeningOption[] => {
  const words = new Set(card.items.map((it) => toTextKey(it.word)))
  const translations = new Set(card.items.map((it) => toTextKey(it.translate)))
  const correctKey = toTextKey(getCardTranslationText(card))
  const picked = new Map<string, string>()

  // some — чтобы не просматривать весь список, когда варианты уже набраны
  candidates.some((candidate) => {
    const text = getCardTranslationText(candidate)
    const key = toTextKey(text)
    const isUsable =
      candidate.id !== card.id &&
      candidate.language === card.language &&
      !!key &&
      key !== correctKey &&
      !picked.has(key) &&
      !candidate.items.some(
        (it) =>
          words.has(toTextKey(it.word)) ||
          translations.has(toTextKey(it.translate))
      )

    if (isUsable) {
      picked.set(key, text)
    }

    return picked.size >= WRONG_OPTIONS_COUNT
  })

  return Array.from(picked, ([key, text]) => ({ key, text, isCorrect: false }))
}

// карточка годится для вопроса: есть что озвучить и хватает разных вариантов
export const isListeningCardPlayable = (
  card: IItem,
  pool: IItem[]
): boolean =>
  !!getCardWordText(card) &&
  !!getCardTranslationText(card) &&
  pickWrongOptions(card, pool).length >= WRONG_OPTIONS_COUNT

// варианты ответа вопроса в случайном порядке
export const buildListeningOptions = (
  card: IItem,
  pool: IItem[]
): ListeningOption[] => {
  const text = getCardTranslationText(card)

  return shuffleArray([
    { key: toTextKey(text), text, isCorrect: true },
    ...pickWrongOptions(card, shuffleArray(pool)),
  ])
}

// после ответа: правильный вариант зелёный, ошибочно выбранный красный
export const getListeningOptionState = (
  option: ListeningOption,
  selectedKey: string | null
): ListeningOptionState => {
  if (selectedKey === null) return 'idle'
  if (option.isCorrect) return 'correct'

  return option.key === selectedKey ? 'wrong' : 'idle'
}

export const isListeningAnswerCorrect = (
  options: ListeningOption[],
  selectedKey: string | null
): boolean => options.some((it) => it.isCorrect && it.key === selectedKey)

const TTS_HINTS: Record<Exclude<TextToSpeechResult, 'ok'>, I18NKeys> = {
  no_engine: 'tts.no_engine',
  lang_unavailable: 'tts.lang_unavailable',
  failed: 'tts.error',
}

// подсказка на экране, если озвучить слово не получилось
export const getTtsHintKey = (result: TextToSpeechResult): I18NKeys | null =>
  result === 'ok' ? null : TTS_HINTS[result]
