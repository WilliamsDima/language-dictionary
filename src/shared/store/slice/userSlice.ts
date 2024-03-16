import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

export type IUser = FirebaseAuthTypes.User
export interface IFirebaseData {
  name: string
  items: any[]
  uid: string
  dateRegistration: Date
}

type InitialState = {
  user: null | IUser
  firebaseData: null | IFirebaseData
}

const initialState: InitialState = {
  user: null,
  firebaseData: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<null | IUser>) => {
      state.user = payload
    },
    setFirebaseData: (
      state,
      { payload }: PayloadAction<null | IFirebaseData>
    ) => {
      state.firebaseData = payload
    },
  },
})

export const userActions = userSlice.actions

export default userSlice.reducer
