import { IItem } from '@/entities/Item/model/item'
import { SelectOption } from '@/shared/UI/Select/Select'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
  modalDeleteItem: IItem | null
}

const initialState: InitialState = {
  modalDeleteItem: null,
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setModalDeleteItem: (state, { payload }: PayloadAction<IItem | null>) => {
      state.modalDeleteItem = payload
    },
  },
})

export const itemsActions = itemsSlice.actions

export default itemsSlice.reducer
