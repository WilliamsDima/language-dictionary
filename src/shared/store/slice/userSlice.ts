import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { ILanguage } from '@/shared/API/services/languages/types'
import type { IItem } from '@/entities/Item/model/item'
import type { I18NKeys } from '@/shared/i18n/types'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'
import { appStorage } from '@/shared/storage/mmkv.storage'
import { SHOW_VARIANTS_LIST } from '@/shared/constants/showVariants'

export type ShowVariantListVale =
  | 'translate_only'
  | 'word_only'
  | 'word_and_translate'

export type ShowVariantList = {
  label: string
  value: ShowVariantListVale
  keyTranslate: I18NKeys
}

const isShowVariantListVale = (value: string): value is ShowVariantListVale => {
  return (
    value === 'translate_only' ||
    value === 'word_only' ||
    value === 'word_and_translate'
  )
}

export const getStoredShowVariantList = (): ShowVariantList | null => {
  const value = appStorage.getString(LOCAL_KEYS.showVariantList)

  if (!value || !isShowVariantListVale(value)) {
    return null
  }

  return (
    SHOW_VARIANTS_LIST.find((item) => item.value === value) || null
  )
}

export const saveShowVariantList = (
  showVariantList: null | ShowVariantList
): void => {
  if (showVariantList) {
    appStorage.setString(LOCAL_KEYS.showVariantList, showVariantList.value)
  } else {
    appStorage.delete(LOCAL_KEYS.showVariantList)
  }
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
  showVariantList: getStoredShowVariantList(),
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
      saveShowVariantList(payload)
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
      saveShowVariantList(null)
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
