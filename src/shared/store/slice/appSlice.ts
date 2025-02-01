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
}

type InitialState = {
  theme: ThemeApp
  isAuth: boolean
  aplication: null | IAplication
  tooltip: TooltipType | null
  hiddenTabBar: boolean
  isWatchSplash: boolean
  showUpdateModal: boolean
}

const initialState: InitialState = {
  theme: 'dark',
  isAuth: false,
  aplication: null,
  tooltip: null,
  hiddenTabBar: false,
  isWatchSplash: false,
  showUpdateModal: false,
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
  },
})

export const appActions = appSlice.actions

export default appSlice.reducer
