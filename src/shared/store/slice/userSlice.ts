import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

export type IUser = FirebaseAuthTypes.User

type InitialState = {
  user: null | IUser
}

const initialState: InitialState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<null | IUser>) => {
      state.user = payload
    },
  },
})

export const userActions = userSlice.actions

export default userSlice.reducer
