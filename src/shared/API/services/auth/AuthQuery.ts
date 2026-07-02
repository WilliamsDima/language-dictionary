import { baseApi } from '@/shared/API/baseApi'
import { toRtkQueryResult } from '@/shared/API/RTK/rtk'
import { authService } from './AuthService'
import type { MeProfile } from '@/shared/API/services/me/types'

export const authAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    googleSync: build.mutation<MeProfile, { idToken: string }>({
      async queryFn({ idToken }) {
        return toRtkQueryResult(await authService.googleSync(idToken))
      },
      invalidatesTags: ['me'],
    }),
  }),
})

export const { useGoogleSyncMutation } = authAPI
