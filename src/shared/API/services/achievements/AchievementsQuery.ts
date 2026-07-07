import { baseApi } from '@/shared/API/baseApi'
import { toRtkQueryResult } from '@/shared/API/RTK/rtk'
import { achievementsService } from './AchievementsService'
import type { AchievementsResponse } from './types'

export const achievementsAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // разблокировка (unlocked/unlocked_at) вычисляется и персистится
    // бэкендом на каждый вызов этого эндпоинта — клиент только отображает
    // результат
    getAchievements: build.query<AchievementsResponse, void>({
      async queryFn() {
        return toRtkQueryResult(await achievementsService.getAchievements())
      },
      providesTags: ['achievements'],
    }),
  }),
})

export const { useGetAchievementsQuery, useLazyGetAchievementsQuery } =
  achievementsAPI
