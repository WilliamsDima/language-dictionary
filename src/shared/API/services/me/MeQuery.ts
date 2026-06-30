import { baseApi } from '@/shared/API/baseApi'
import { toRtkQueryResult } from '@/shared/API/RTK/rtk'
import { meService } from './MeService'
import type { MeProfile, UpdateLanguagesPayload } from './types'

export const meAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<MeProfile, void>({
      async queryFn() {
        return toRtkQueryResult(await meService.getMe())
      },
      providesTags: ['me'],
    }),

    updateMeLanguages: build.mutation<MeProfile, UpdateLanguagesPayload>({
      async queryFn(payload) {
        return toRtkQueryResult(await meService.updateLanguages(payload))
      },
      async onQueryStarted({ languages, nativeLanguageId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          meAPI.util.updateQueryData('getMe', undefined, (draft) => {
            draft.languages = languages
            draft.native_language_id = nativeLanguageId
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
