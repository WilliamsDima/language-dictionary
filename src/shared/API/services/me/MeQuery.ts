import { baseApi } from '@/shared/API/baseApi'
import { toRtkQueryResult } from '@/shared/API/RTK/rtk'
import { meService } from './MeService'
import type { MeProfile } from './types'

export const meAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<MeProfile, void>({
      async queryFn() {
        return toRtkQueryResult(await meService.getMe())
      },
      providesTags: ['me'],
    }),

    updateMeLanguages: build.mutation<MeProfile, number[]>({
      async queryFn(languages) {
        return toRtkQueryResult(await meService.updateLanguages(languages))
      },
      async onQueryStarted(languages, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          meAPI.util.updateQueryData('getMe', undefined, (draft) => {
            draft.languages = languages
          })
        )
        try {
          await queryFulfilled
        } catch {
          patch.undo()
        }
      },
    }),

    deleteMe: build.mutation<{ deleted: number }, void>({
      async queryFn() {
        return toRtkQueryResult(await meService.deleteMe())
      },
    }),
  }),
})

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useUpdateMeLanguagesMutation,
  useDeleteMeMutation,
} = meAPI
