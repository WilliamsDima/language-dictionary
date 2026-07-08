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
} as AppLanguagesType

export const defaultAppLanguage: AppLanguageType = appLanguagesList.ru
