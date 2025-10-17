import { isSmallDevices } from './../../helpers/ScaleUtils'
import { TooltipType } from '@/entities/Tooltip/model/Tooltip'
import { SelectOption } from '@/shared/UI/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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
  showVariantsList: SelectOption[]
  privacy_policy_link: string
  showVKAuth: boolean
  translations: TranslationsType
  appLanguages: AppLanguagesType
}

type InitialState = {
  theme: ThemeApp
  isAuth: boolean
  showYearResult: boolean
  aplication: null | IAplication
  tooltip: TooltipType | null
  hiddenTabBar: boolean
  isWatchSplash: boolean
  showUpdateModal: boolean
  appLanguage: AppLanguageType | null
}

const initialState: InitialState = {
  theme: 'dark',
  isAuth: false,
  aplication: null,
  tooltip: null,
  hiddenTabBar: false,
  isWatchSplash: false,
  showUpdateModal: false,
  showYearResult: false,
  appLanguage: null,
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
    setTooltip: (state, { payload }: PayloadAction<TooltipType | null>) => {
      state.tooltip = payload
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
  },
})

export const appActions = appSlice.actions

export default appSlice.reducer
