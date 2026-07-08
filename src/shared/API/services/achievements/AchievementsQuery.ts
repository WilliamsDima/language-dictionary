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

    // выдаёт достижение "оставил отзыв о приложении" (code = app_reviewer).
    // Идемпотентно на бэкенде, вызывается спустя задержку после перехода в
    // стор из ModalAppReview — без реальной проверки того, что отзыв правда
    // оставлен. Инвалидируем achievements, чтобы ModalAchievementUnlocked
    // сам подхватил новую разблокировку через сравнение снимков
    submitAppReview: build.mutation<AchievementsResponse, void>({
      async queryFn() {
        return toRtkQueryResult(await achievementsService.submitAppReview())
      },
      invalidatesTags: ['achievements'],
    }),
  }),
})

export const {
  useGetAchievementsQuery,
  useLazyGetAchievementsQuery,
  useSubmitAppReviewMutation,
} = achievementsAPI
