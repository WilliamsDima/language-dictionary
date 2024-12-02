import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { SelectOption } from '@/shared/UI/Select/Select'
import { ILanguage } from '@/shared/json/languages'
import { IItem } from '@/entities/Item/model/item'

export type IUser = FirebaseAuthTypes.User

export interface IFirebaseData {
  name: string
  uid: string
  dateRegistration: Date
  showVariantList: null | {
    label: string
    value: 'translate_only' | 'word_only' | 'word_and_translate'
  }
  email: string
  languages: ILanguage[]
  native_language: ILanguage | null
  image: string
}

type InitialState = {
  firebaseData: null | IFirebaseData
  showAddModal: boolean
  itemEdit: null | IItem
  isVkLogin: boolean
}

const initialState: InitialState = {
  firebaseData: null,
  showAddModal: false,
  itemEdit: null,
  isVkLogin: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
    setIsVkLogin: (state, { payload }: PayloadAction<boolean>) => {
      state.isVkLogin = payload
    },
  },
})

export const userActions = userSlice.actions

export default userSlice.reducer
