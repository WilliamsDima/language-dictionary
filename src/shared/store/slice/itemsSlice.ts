import { IItem, StatusItem } from '@/entities/Item/model/item'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ShowVariantListVale } from './userSlice'

export type FilterMain = {
  sortDate?: 'asc' | 'desc'
  languages?: string[]
}

export type CardsLimitValue = 'ALL' | 20 | 50 | 100

export type FilterCardsModal = {
  status: StatusItem
  languages: string[]
  showVariant: ShowVariantListVale | null
  limit: CardsLimitValue
}

type InitialState = {
  modalDeleteItem: IItem | null
  lastSaveData: Date | null | undefined
  filterByStatus: StatusItem
  search: string
  showFilterMain: boolean
  filterMain: FilterMain | null
  filterCardsModal: FilterCardsModal
}

const initialState: InitialState = {
  modalDeleteItem: null,
  lastSaveData: null,
  filterByStatus: 'ALL',
  search: '',
  showFilterMain: false,
  filterMain: {
    sortDate: 'desc',
  },
  filterCardsModal: {
    status: 'STUDY',
    languages: [],
    showVariant: 'word_only',
    limit: 'ALL',
  },
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setModalDeleteItem: (state, { payload }: PayloadAction<IItem | null>) => {
      state.modalDeleteItem = payload
    },
    setLastSaveData: (
      state,
      { payload }: PayloadAction<Date | null | undefined>
    ) => {
      state.lastSaveData = payload
    },
    setFilterByStatus: (state, { payload }: PayloadAction<StatusItem>) => {
      state.filterByStatus = payload
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload
    },
    setShowFilterMain: (state, { payload }: PayloadAction<boolean>) => {
      state.showFilterMain = payload
    },
    setFilterMain: (state, { payload }: PayloadAction<FilterMain>) => {
      state.filterMain = payload
    },
    setFilterCardsModal: (
      state,
      { payload }: PayloadAction<FilterCardsModal>
    ) => {
      state.filterCardsModal = payload
    },
  },
})

export const itemsActions = itemsSlice.actions

export default itemsSlice.reducer
