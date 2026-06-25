import type {
  AppLanguagesType,
  AppLanguageType,
} from '@/shared/store/slice/appSlice'

export const appLanguagesList = {
  ru: {
    id: 1,
    name: 'Russian',
    nativeName: 'Русский',
    code: 'ru',
    emoji: 'ru',
  },
  en: {
    id: 2,
    name: 'English',
    nativeName: 'English',
    code: 'en',
    emoji: 'gb',
  },
  de: {
    id: 3,
    name: 'German',
    nativeName: 'Deutsch',
    code: 'de',
    emoji: 'de',
  },
  fr: {
    id: 4,
    name: 'French',
    nativeName: 'Français',
    code: 'fr',
    emoji: 'fr',
  },
  es: {
    id: 5,
    name: 'Spanish',
    nativeName: 'Español',
    code: 'es',
    emoji: 'es',
  },
  it: {
    id: 6,
    name: 'Italian',
    nativeName: 'Italiano',
    code: 'it',
    emoji: 'it',
  },
  pt: {
    id: 7,
    name: 'Portuguese',
    nativeName: 'Português',
    code: 'pt',
    emoji: 'pt',
  },
  pl: {
    id: 8,
    name: 'Polish',
    nativeName: 'Polski',
    code: 'pl',
    emoji: 'pl',
  },
  tr: {
    id: 9,
    name: 'Turkish',
    nativeName: 'Türkçe',
    code: 'tr',
    emoji: 'tr',
  },
  ja: {
    id: 10,
    name: 'Japanese',
    nativeName: '日本語',
    code: 'ja',
    emoji: 'jp',
  },
  zh: {
    id: 11,
    name: 'Chinese',
    nativeName: '中文',
    code: 'zh',
    emoji: 'cn',
  },
} as AppLanguagesType

export const defaultAppLanguage: AppLanguageType = appLanguagesList.ru
