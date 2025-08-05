import { IItem, StatusItem } from '@/entities/Item/model/item'
import { FilterMain } from '@/shared/firebase/api'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ShowVariantListVale } from './userSlice'

export type FilterCardsModal = {
  status: StatusItem
  languages: number[]
  showVariant: ShowVariantListVale | null
}

type InitialState = {
  modalDeleteItem: IItem | null
  lastSaveData: Date | null | undefined
  filterByStatus: StatusItem
  search: string
  showFilterMain: boolean
  filterMain: FilterMain | null
  filterCardsModal: FilterCardsModal
  items: Record<number, IItem>
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
  },
  items: {},
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, { payload }: PayloadAction<Record<number, IItem>>) => {
      state.items = payload ? payload : state.items
    },
    addItemAC: (state, { payload }: PayloadAction<IItem>) => {
      state.items[payload.id] = payload
    },
    updateItemAC: (state, { payload }: PayloadAction<IItem>) => {
      if (state.items[payload.id]) {
        state.items[payload.id] = payload
      }
    },
    deleteItemAC: (state, { payload }: PayloadAction<IItem>) => {
      if (state.items[payload.id]) {
        delete state.items[payload.id]
      }
    },
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
