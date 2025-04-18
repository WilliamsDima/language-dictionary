import { IItem } from '@/entities/Item/model/item'
import { baseApi } from '@/shared/API/baseApi'
import {
  getItems,
  addItemAPI,
  updateItemAPI,
  deleteItemAPI,
  GetItemsParams,
} from '@/shared/firebase/api'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore/lite'

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

export type GetItemsCountParams = {
  uid?: string
}

export type GetItemsRequest = {
  items: IItem[]
  lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>
}

export const cardsServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // получение списка
    getItems: build.query<GetItemsRequest, GetItemsParams>({
      async queryFn(query) {
        try {
          if (!query?.uid) {
            console.warn('getItems: uid is undefined')
            return { data: { items: [], lastVisible: undefined } }
          }

          const items = await getItems(query)
          return {
            data: { items: items?.items, lastVisible: items?.lastVisible },
            error: items?.error,
            meta: {},
          }
        } catch (error: any) {
          console.log('Error getItems', error?.message)
          return { error: error?.message }
        }
      },
      providesTags: ['items'],
    }),
    // добавление элемента
    addItem: build.mutation<IItem, AddItemParams>({
      async queryFn({ item, uid }) {
        const items = await addItemAPI(uid, item)
        return { data: items, error: items?.error, meta: {} }
      },
      invalidatesTags: ['items'],
    }),
    // обновление элемента
    updateItem: build.mutation<IItem, UpdateItemParams>({
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
    deleteItem: build.mutation<
      { success: boolean; id: string },
      DeleteItemParams
    >({
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
  useLazyGetItemsQuery,
} = cardsServices
