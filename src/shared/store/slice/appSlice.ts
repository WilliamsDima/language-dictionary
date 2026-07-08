import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  appLanguagesList,
  defaultAppLanguage,
} from '@/shared/constants/appLanguages'

export type ThemeApp = 'dark' | 'light'

export interface ISocial {
  id: number
  link: string
  icon: string
  name: string
}

export interface IBlock {
  id: number
  blockName?: string
  text?: string
  punkts?: string[]
}

export interface IAbout {
  blocks: IBlock[]
}

export type TranslationKeys =
  | 'ru'
  | 'uk'
  | 'be'
  | 'ka'
  | 'uz'
  | 'az'
  | 'tg'
  | 'en'
  | 'de'
  | 'fr'
  | 'es'
  | 'it'
  | 'pt'
  | 'nl'
  | 'sv'
  | 'no'
  | 'fi'
  | 'da'
  | 'pl'
  | 'cs'
  | 'hu'
  | 'tr'
  | 'ar'
  | 'he'
  | 'zh'
  | 'ja'
  | 'ko'
  | 'hi'
  | 'bn'
  | 'pa'
  | 'vi'
  | 'th'
  | 'id'
  | 'ms'
  | 'fa'
  | 'sw'
  | 'ro'
export type TranslationsType = Record<TranslationKeys, string>

export type AppLanguageType = {
  name: string
  nativeName: string
  code: TranslationKeys
  emoji: string
  id: number
}
export type AppLanguagesType = Record<TranslationKeys, AppLanguageType>

export interface IAplication {
  about: IAbout
  appName: string
  developer: {
    icon: string
    link: string
    text: string
  }
  socials: ISocial[]
  version: string
  privacy_policy_link: string
  translations: TranslationsType
  appLanguages: AppLanguagesType
}

type InitialState = {
  theme: ThemeApp
  isAuth: boolean
  showYearResult: boolean
  aplication: null | IAplication
  hiddenTabBar: boolean
  isWatchSplash: boolean
  showUpdateModal: boolean
  appLanguage: AppLanguageType | null
  showDailyStreakSuccessModal: boolean
  dailyStreakAnimation: { from: number; to: number } | null
  showAppReviewModal: boolean
}

const initialState: InitialState = {
  theme: 'dark',
  isAuth: false,
  aplication: {
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
    version: '',
    privacy_policy_link: '',
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
    appLanguages: appLanguagesList,
  },
  hiddenTabBar: false,
  isWatchSplash: false,
  showUpdateModal: false,
  showYearResult: false,
  appLanguage: defaultAppLanguage,
  showDailyStreakSuccessModal: false,
  dailyStreakAnimation: null,
  showAppReviewModal: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppData: (state, { payload }: PayloadAction<null | IAplication>) => {
      state.aplication = payload
    },
    setThemeApp: (state, { payload }: PayloadAction<ThemeApp>) => {
      state.theme = payload
    },
    setIsAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuth = payload
    },
    setShowYearResult: (state, { payload }: PayloadAction<boolean>) => {
      state.showYearResult = payload
    },
    setHiddenTabBar: (state, { payload }: PayloadAction<boolean>) => {
      state.hiddenTabBar = payload
    },
    setIsWatchSplash: (state, { payload }: PayloadAction<boolean>) => {
      state.isWatchSplash = payload
    },
    setShowUpdateModal: (state, { payload }: PayloadAction<boolean>) => {
      state.showUpdateModal = payload
    },
    setAppLanguage: (
      state,
      { payload }: PayloadAction<AppLanguageType | null>
    ) => {
      state.appLanguage = payload
    },
    setShowDailyStreakSuccessModal: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.showDailyStreakSuccessModal = payload
    },
    setDailyStreakAnimation: (
      state,
      { payload }: PayloadAction<{ from: number; to: number } | null>
    ) => {
      state.dailyStreakAnimation = payload
    },
    setShowAppReviewModal: (state, { payload }: PayloadAction<boolean>) => {
      state.showAppReviewModal = payload
    },
  },
})

export const appActions = appSlice.actions

export default appSlice.reducer
