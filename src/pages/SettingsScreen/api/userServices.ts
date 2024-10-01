import { baseApi } from '@/shared/API/baseApi'
import { getUserData, updateUserProfile } from '@/shared/firebase/api'
import { IFirebaseData } from '@/shared/store/slice/userSlice'

export type UpdateUserProfileParams = {
  uid: string
  data: IFirebaseData
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
  }),
})

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } =
  userServices
