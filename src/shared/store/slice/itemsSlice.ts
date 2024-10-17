import { IItem, StatusItem } from '@/entities/Item/model/item'
import { FilterMain } from '@/shared/firebase/api'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
  modalDeleteItem: IItem | null
  lastSaveData: Date | null | undefined
  filterByStatus: StatusItem
  search: string
  showFilterMain: boolean
  filterMain: FilterMain | null
}

const initialState: InitialState = {
  modalDeleteItem: null,
  lastSaveData: null,
  filterByStatus: 'ALL',
  search: '',
  showFilterMain: false,
  filterMain: null,
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
    setFilterMain: (state, { payload }: PayloadAction<FilterMain | null>) => {
      state.filterMain = payload
    },
  },
})

export const itemsActions = itemsSlice.actions

export default itemsSlice.reducer
