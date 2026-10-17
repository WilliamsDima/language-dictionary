import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  appLanguagesList,
  defaultAppLanguage,
} from '@/shared/constants/appLanguages'
import type { StreakFrozenInfo } from '@/shared/API/services/streak/types'
import { mergeStreakFrozenInfo } from '@/shared/helpers/streakFreeze'

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
  // системное разрешение на уведомления; null — ещё не проверяли
  hasNotificationPermission: boolean | null
  // pre-prompt / «уведомления отключены» перед включением напоминаний
  showReminderPermissionModal: boolean
  // модалка «Стрик заморожен»: null — показывать нечего
  streakFrozen: StreakFrozenInfo | null
  // даты заморозок, уже показанных в этой сессии, — не показываем их
  // повторно, даже если сервер ещё не подтвердил seen или запрос упал
  streakFrozenShownDates: string[]
  // заморозки в ответе completeStreak: earned — тост «+1 заморозка» после
  // модалки успеха; motivationAt — день следующей заморозки (мотивация на
  // 15, 45, 75… день серии)
  dailyStreakFreeze: { earned: boolean; motivationAt: number | null } | null
  // тост «+1 заморозка» на экране — модалки достижений ждут, пока он
  // не скроется (RN Modal перекрыл бы тост)
  isStreakFreezeToastActive: boolean
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
    appLanguages: appLanguagesList,
  },
  hiddenTabBar: false,
  isWatchSplash: false,
  showUpdateModal: false,
  showYearResult: false,
  appLanguage: defaultAppLanguage,
  showDailyStreakSuccessModal: false,
  dailyStreakAnimation: null,
  hasNotificationPermission: null,
  showReminderPermissionModal: false,
  streakFrozen: null,
  streakFrozenShownDates: [],
  dailyStreakFreeze: null,
  isStreakFreezeToastActive: false,
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
    setHasNotificationPermission: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.hasNotificationPermission = payload
    },
    setShowReminderPermissionModal: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.showReminderPermissionModal = payload
    },
    showStreakFrozen: (state, { payload }: PayloadAction<StreakFrozenInfo>) => {
      state.streakFrozen = mergeStreakFrozenInfo(
        state.streakFrozen,
        payload,
        state.streakFrozenShownDates
      )
    },
    dismissStreakFrozen: (state) => {
      if (state.streakFrozen) {
        state.streakFrozenShownDates.push(...state.streakFrozen.dates)
      }
      state.streakFrozen = null
    },
    resetStreakFrozen: (state) => {
      state.streakFrozen = null
      state.streakFrozenShownDates = []
    },
    setDailyStreakFreeze: (
      state,
      {
        payload,
      }: PayloadAction<{ earned: boolean; motivationAt: number | null } | null>
    ) => {
      state.dailyStreakFreeze = payload
    },
    setIsStreakFreezeToastActive: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isStreakFreezeToastActive = payload
    },
  },
})

export const appActions = appSlice.actions

export default appSlice.reducer
