import type {
  AppLanguagesType,
  AppLanguageType,
  IAplication,
} from '@/shared/store/slice/appSlice'
import type {
  IFirebaseData,
  MainButtonSide,
  ShowVariantList,
} from '@/shared/store/slice/userSlice'

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

const mainButtonSides: MainButtonSide[] = [
  {
    label: 'Правша',
    value: 'right',
    keyTranslate: 'settingsScreen.mainButtonSides.right',
  },
  {
    label: 'Левша',
    value: 'left',
    keyTranslate: 'settingsScreen.mainButtonSides.left',
  },
]

const mockAppLanguages: AppLanguagesType = {
  ru: {
    id: 1,
    name: 'Russian',
    nativeName: 'Русский',
    code: 'ru',
    emoji: 'ru',
    ruName: 'Русский',
  },
  en: {
    id: 2,
    name: 'English',
    nativeName: 'English',
    code: 'en',
    emoji: 'gb',
    ruName: 'Английский',
  },
  de: {
    id: 3,
    name: 'German',
    nativeName: 'Deutsch',
    code: 'de',
    emoji: 'de',
    ruName: 'Немецкий',
  },
  fr: {
    id: 4,
    name: 'French',
    nativeName: 'Français',
    code: 'fr',
    emoji: 'fr',
    ruName: 'Французский',
  },
  es: {
    id: 5,
    name: 'Spanish',
    nativeName: 'Español',
    code: 'es',
    emoji: 'es',
    ruName: 'Испанский',
  },
  it: {
    id: 6,
    name: 'Italian',
    nativeName: 'Italiano',
    code: 'it',
    emoji: 'it',
    ruName: 'Итальянский',
  },
  pt: {
    id: 7,
    name: 'Portuguese',
    nativeName: 'Português',
    code: 'pt',
    emoji: 'pt',
    ruName: 'Португальский',
  },
  pl: {
    id: 8,
    name: 'Polish',
    nativeName: 'Polski',
    code: 'pl',
    emoji: 'pl',
    ruName: 'Польский',
  },
  tr: {
    id: 9,
    name: 'Turkish',
    nativeName: 'Türkçe',
    code: 'tr',
    emoji: 'tr',
    ruName: 'Турецкий',
  },
  ja: {
    id: 10,
    name: 'Japanese',
    nativeName: '日本語',
    code: 'ja',
    emoji: 'jp',
    ruName: 'Японский',
  },
  zh: {
    id: 11,
    name: 'Chinese',
    nativeName: '中文',
    code: 'zh',
    emoji: 'cn',
    ruName: 'Китайский',
  },
}

export const mockAppLanguage: AppLanguageType = {
  ...mockAppLanguages.ru,
}

export const mockAppData: IAplication = {
  about: {
    blocks: [],
  },
  appName: 'Nori',
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
    en: 'local',
    de: 'local',
    fr: 'local',
    es: 'local',
    it: 'local',
    pt: 'local',
    pl: 'local',
    tr: 'local',
    ja: 'local',
    zh: 'local',
  } as IAplication['translations'],
  appLanguages: mockAppLanguages,
}

export const mockFirebaseData: IFirebaseData = {
  name: 'Demo User',
  uid: 'demo-user',
  email: '',
  dateRegistration: new Date(),
  showVariantList: showVariantsList[1],
  mainButtonSide: mainButtonSides[0],
  languages: [],
  native_language: null,
  image: '',
  activity: {
    year: {},
  },
}
