import type {
  AppLanguagesType,
  AppLanguageType,
  IAplication,
} from '@/shared/store/slice/appSlice'
import type { IFirebaseData, ShowVariantList } from '@/shared/store/slice/userSlice'

const showVariantsList: ShowVariantList[] = [
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

export const mockAppLanguage: AppLanguageType = {
  id: 1,
  name: 'Russian',
  nativeName: 'Русский',
  code: 'ru',
  emoji: 'ru',
  ruName: 'Русский',
}

export const mockAppData: IAplication = {
  about: {
    blocks: [],
  },
  appName: 'WordCards',
  developer: {
    icon: '',
    link: '',
    text: '',
  },
  socials: [],
  version: 'demo',
  showVariantsList,
  privacy_policy_link: '',
  showVKAuth: false,
  translations: {
    ru: 'local',
  } as IAplication['translations'],
  appLanguages: {
    ru: mockAppLanguage,
  } as AppLanguagesType,
}

export const mockFirebaseData: IFirebaseData = {
  name: 'Demo User',
  uid: 'demo-user',
  email: '',
  dateRegistration: new Date(),
  showVariantList: showVariantsList[1],
  languages: [],
  native_language: null,
  image: '',
  activity: {
    year: {},
  },
}
