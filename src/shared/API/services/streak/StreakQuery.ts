import { baseApi } from '@/shared/API/baseApi'
import { toRtkQueryResult } from '@/shared/API/RTK/rtk'
import { appActions } from '@/shared/store/slice/appSlice'
import { streakService } from './StreakService'
import type {
  CompleteStreakResponse,
  DailyChallengeResponse,
  StreakStatus,
} from './types'

export const streakAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStreakStatus: build.query<StreakStatus, string>({
      async queryFn(date) {
        return toRtkQueryResult(await streakService.getStatus(date))
      },
      providesTags: ['streak'],
    }),

    getDailyChallenge: build.query<DailyChallengeResponse, string>({
      async queryFn(date) {
        return toRtkQueryResult(await streakService.getDailyChallenge(date))
      },
      providesTags: ['dailyChallenge'],
    }),

    // завершение задания дня — по контракту бэкенда идемпотентно для одной
    // и той же даты, поэтому здесь достаточно просто дождаться ответа и
    // показать модалку успеха; повторный вызов с той же датой безопасен
    completeStreak: build.mutation<CompleteStreakResponse, string>({
      async queryFn(date) {
        return toRtkQueryResult(await streakService.complete(date))
      },
      invalidatesTags: ['streak', 'dailyChallenge'],
      async onQueryStarted(_date, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled.catch(() => ({ data: null }))
        if (!data) return

        dispatch(
          appActions.setDailyStreakAnimation({
            from: data.previous_streak,
            to: data.current_streak,
          })
        )
        dispatch(appActions.setShowDailyStreakSuccessModal(true))
      },
    }),
  }),
})

export const {
  useGetStreakStatusQuery,
  useGetDailyChallengeQuery,
  useLazyGetDailyChallengeQuery,
  useCompleteStreakMutation,
} = streakAPI
