import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { FirebaseAuthTypes } from '@react-native-firebase/auth'
import type { ILanguage } from '@/shared/json/languages'
import type { IItem } from '@/entities/Item/model/item'

export type IUser = FirebaseAuthTypes.User

export type ShowVariantListVale =
  | 'translate_only'
  | 'word_only'
  | 'word_and_translate'

export type ShowVariantList = {
  label: string
  value: ShowVariantListVale
}

export interface IActivityMonth {
  addedCards: number // добавлено карточек за месяц ✅
  viewedAds: number // количество просмотренной рекламмы ✅
  openApp: number // количество заходов в приложение ✅
  startTraningCards: number // количество раз сколько было заходов на повторение карточек ✅
  activeDays: string[] // количество активных дней в месяце ✅
  totalTimeSpent: number // Время в секундах за месяц проведено в приложении ✅
  studiedCard: number // количество изученных карточек за месяц ✅
  repeatCard: number // количество повторений карточек за месяц ✅
}

// api для запросов на получение примера использования слова, но работает только для английского https://www.wordsapi.com/

// A1 (Beginner)	500 - 1000 слов
// A2 (Elementary)	1000 - 2000 слов
// B1 (Intermediate)	2000 - 4000 слов
// B2 (Upper-Intermediate)	4000 - 8000 слов
// C1 (Advanced)	8000 - 12000 слов
// C2 (Proficient)	12000+ слов

// TODO: любимый язык, оценка уровня,
export interface IActivityYear {
  // месяц
  [key: number]: IActivityMonth
}

export interface IUserActivity {
  year: {
    // 2025 и т.д.
    [key: number]: IActivityYear
  }
}

export interface IFirebaseData {
  name: string
  uid: string
  dateRegistration: Date
  showVariantList: null | ShowVariantList
  email: string
  languages: ILanguage[]
  native_language: ILanguage | null
  image: string
  activity?: IUserActivity
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
