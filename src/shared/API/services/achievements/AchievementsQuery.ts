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

    // подтверждает показ модалки разблокировки (seen = true). Ответ — тот же
    // список, что и у GET /achievements, поэтому кладём его прямо в кэш
    // getAchievements вместо лишнего рефетча. Ошибку глотаем: непомеченное
    // достижение просто покажется снова при следующем запуске
    markAchievementsSeen: build.mutation<AchievementsResponse, number[]>({
      async queryFn(ids) {
        return toRtkQueryResult(await achievementsService.markSeen(ids))
      },
      async onQueryStarted(_ids, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            achievementsAPI.util.upsertQueryData(
              'getAchievements',
              undefined,
              data
            )
          )
        } catch {
          // мягкая обработка — см. комментарий выше
        }
      },
    }),
  }),
})

export const {
  useGetAchievementsQuery,
  useLazyGetAchievementsQuery,
  useMarkAchievementsSeenMutation,
} = achievementsAPI
