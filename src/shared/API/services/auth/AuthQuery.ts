import { baseApi } from '@/shared/API/baseApi'
import { toRtkQueryResult } from '@/shared/API/RTK/rtk'
import { setAuthToken } from '@/shared/lib/authToken'
import { authService } from './AuthService'
import type { MeProfile } from '@/shared/API/services/me/types'

export const authAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    googleSync: build.mutation<MeProfile, { idToken: string }>({
      async queryFn({ idToken }) {
        return toRtkQueryResult(await authService.googleSync(idToken))
      },
      async onQueryStarted({ idToken }, { queryFulfilled }) {
        try {
          await queryFulfilled
          setAuthToken(idToken)
        } catch {
          // токен не сохраняем — пользователь остаётся разлогинен
        }
      },
      invalidatesTags: ['me'],
    }),
  }),
})

export const { useGoogleSyncMutation } = authAPI
