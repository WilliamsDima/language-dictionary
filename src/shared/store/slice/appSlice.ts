import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
  app: string
}

const initialState: InitialState = {
  app: 'app',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setApp: (state, { payload }: PayloadAction<string>) => {
      state.app = payload
    },
  },
})

export const appActions = appSlice.actions

export default appSlice.reducer
