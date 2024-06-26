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
  showAddModal: boolean
  itemEdit: null | any
}

const initialState: InitialState = {
  user: null,
  firebaseData: null,
  showAddModal: false,
  itemEdit: null,
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
    setShowAddModal: (state, { payload }: PayloadAction<boolean>) => {
      state.showAddModal = payload
    },
    setItemEdit: (state, { payload }: PayloadAction<null | any>) => {
      state.itemEdit = payload
    },
  },
})

export const userActions = userSlice.actions

export default userSlice.reducer
