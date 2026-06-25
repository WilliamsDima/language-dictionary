import type { ShowVariantList } from '@/shared/store/slice/userSlice'

export const SHOW_VARIANTS_LIST: ShowVariantList[] = [
  {
    label: 'Только перевод',
    value: 'translate_only',
    keyTranslate: 'settingsScreen.showVariantsList.translate_only',
  },
  {
    label: 'Слово без перевода',
    value: 'word_only',
    keyTranslate: 'settingsScreen.showVariantsList.word_only',
  },
  {
    label: 'Слово и перевод',
    value: 'word_and_translate',
    keyTranslate: 'settingsScreen.showVariantsList.word_and_translate',
  },
]

export const DEFAULT_SHOW_VARIANT: ShowVariantList = SHOW_VARIANTS_LIST[1]
