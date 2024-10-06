import { IItem } from '@/entities/Item/model/item'
import { baseApi } from '@/shared/API/baseApi'
import {
  getUserData,
  getItems,
  updateUserProfile,
  addItemAPI,
} from '@/shared/firebase/api'
import { IFirebaseData } from '@/shared/store/slice/userSlice'

export type UpdateUserProfileParams = {
  uid: string
  data: IFirebaseData
}

export type AddItemParams = {
  uid: string
  item: IItem
}

export type GetItemsParams = {
  uid?: string
}

export const userServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // получение пользователя
    getUserProfile: build.query<IFirebaseData, string | undefined>({
      async queryFn(uid) {
        try {
          const user = uid ? await getUserData(uid) : ''
          return { data: user }
        } catch (error: any) {
          console.log('Error getUserProfile', error?.message)
          return { error: error.message }
        }
      },
      providesTags: ['user'],
    }),
    // обновление пользователя
    updateUserProfile: build.mutation<any, UpdateUserProfileParams>({
      async queryFn({ data, uid }) {
        try {
          const res = await updateUserProfile(uid, data)
          return { data: res }
        } catch (error: any) {
          console.log('Error updateUserProfile', error?.message)
          return { error: error.message }
        }
      },
      invalidatesTags: ['user'],
    }),
    // получение списка
    getItems: build.query<IItem[], GetItemsParams>({
      async queryFn({ uid }) {
        try {
          const items = await getItems(uid)
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
  }),
})

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetItemsQuery,
  useAddItemMutation,
} = userServices
