import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { ILanguage } from '@/shared/json/languages'
import type { IItem } from '@/entities/Item/model/item'
import type { I18NKeys } from '@/shared/i18n/types'

export type ShowVariantListVale =
  | 'translate_only'
  | 'word_only'
  | 'word_and_translate'

export type ShowVariantList = {
  label: string
  value: ShowVariantListVale
  keyTranslate: I18NKeys
}

export type MainButtonSideValue = 'left' | 'right'

export type MainButtonSide = {
  label: string
  value: MainButtonSideValue
  keyTranslate: I18NKeys
}

export interface IActivityMonth {
  addedCards: number
  viewedAds: number
  openApp: number
  startTraningCards: number
  activeDays: string[]
  totalTimeSpent: number
  studiedCard: number
  repeatCard: number
}

export interface IActivityYear {
  [key: number]: IActivityMonth
}

export interface IUserActivity {
  year: {
    [key: number]: IActivityYear
  }
}

type InitialState = {
  showVariantList: null | ShowVariantList
  mainButtonSide: null | MainButtonSide
  native_language: null | ILanguage
  activity: null | IUserActivity
  showAddModal: boolean
  itemEdit: null | IItem
}

const initialState: InitialState = {
  showVariantList: null,
  mainButtonSide: null,
  native_language: null,
  activity: null,
  showAddModal: false,
  itemEdit: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setShowVariantList: (
      state,
      { payload }: PayloadAction<null | ShowVariantList>
    ) => {
      state.showVariantList = payload
    },
    setMainButtonSide: (
      state,
      { payload }: PayloadAction<null | MainButtonSide>
    ) => {
      state.mainButtonSide = payload
    },
    setNativeLanguage: (
      state,
      { payload }: PayloadAction<null | ILanguage>
    ) => {
      state.native_language = payload
    },
    setActivity: (
      state,
      { payload }: PayloadAction<null | IUserActivity>
    ) => {
      state.activity = payload
    },
    clearLocalSettings: (state) => {
      state.showVariantList = null
      state.mainButtonSide = null
      state.native_language = null
      state.activity = null
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
