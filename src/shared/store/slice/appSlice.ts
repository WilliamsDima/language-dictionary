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
  developer: {
    icon: string
    link: string
    text: string
  }
  socials: ISocial[]
  version: string
  privacy_policy_link: string
}

type InitialState = {
  theme: ThemeApp
  isAuth: boolean
  aplication: null | IAplication
}

const initialState: InitialState = {
  theme: 'dark',
  isAuth: false,
  aplication: null,
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
  },
})

export const appActions = appSlice.actions

export default appSlice.reducer
