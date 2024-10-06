import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { SelectOption } from '@/shared/UI/Select/Select'
import { ILanguage } from '@/shared/json/languages'

export type IUser = FirebaseAuthTypes.User

export interface IFirebaseData {
  name: string
  uid: string
  dateRegistration: Date
  showVariantList: null | SelectOption
  email: string
  languages: ILanguage[]
  native_language: ILanguage | null
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
