import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type ThemeApp = 'dark' | 'light'

type InitialState = {
  app: string
  theme: ThemeApp
  isAuth: boolean
}

const initialState: InitialState = {
  app: 'app',
  theme: 'dark',
  isAuth: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setApp: (state, { payload }: PayloadAction<string>) => {
      state.app = payload
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
