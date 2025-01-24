import { IItem } from '@/entities/Item/model/item'
import { baseApi } from '@/shared/API/baseApi'
import {
  getItems,
  addItemAPI,
  updateItemAPI,
  deleteItemAPI,
  FilterItems,
} from '@/shared/firebase/api'

export type AddItemParams = {
  uid: string
  item: IItem
}

export type UpdateItemParams = {
  uid: string
  idDoc: string
  updatedData: Partial<IItem>
}

export type DeleteItemParams = {
  uid: string
  idDoc: string
}

export type GetItemsParams = {
  uid?: string
  filter?: FilterItems
}

export const cardsServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // получение списка
    getItems: build.query<IItem[], GetItemsParams>({
      async queryFn({ uid, filter }) {
        try {
          if (!uid) return

          const items = await getItems(uid, filter)
          return { data: items }
        } catch (error: any) {
          console.log('Error getItems', error?.message)
          return { error: error.message }
        }
      },
      providesTags: ['items'],
    }),
    // добавление элемента
    addItem: build.mutation<IItem[], AddItemParams>({
      async queryFn({ item, uid }) {
        try {
          const items = await addItemAPI(uid, item)
          return { data: items }
        } catch (error: any) {
          console.log('Error addItem', error?.message)
          return { error: error.message }
        }
      },
      invalidatesTags: ['items'],
    }),
    // обновление элемента
    updateItem: build.mutation<any, UpdateItemParams>({
      async queryFn({ idDoc, uid, updatedData }) {
        try {
          const res = await updateItemAPI(uid, idDoc, updatedData)
          return { data: res }
        } catch (error: any) {
          console.log('Error updateItem', error?.message)
          return { error: error.message }
        }
      },
      invalidatesTags: ['items'],
    }),
    // удаление элемента
    deleteItem: build.mutation<any, DeleteItemParams>({
      async queryFn({ idDoc, uid }) {
        try {
          const res = await deleteItemAPI(uid, idDoc)
          return { data: res }
        } catch (error: any) {
          console.log('Error deleteItem', error?.message)
          return { error: error.message }
        }
      },
      invalidatesTags: ['items'],
    }),
  }),
})

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = cardsServices
