import { baseApi } from '@/shared/API/baseApi'
import { toRtkQueryResult } from '@/shared/API/RTK/rtk'
import { appActions } from '@/shared/store/slice/appSlice'
import {
  getStreakFreezeMotivationTarget,
  getStreakFrozenInfo,
} from '@/shared/helpers/streakFreeze'
import { streakService } from './StreakService'
import type {
  CompleteStreakResponse,
  DailyChallengeResponse,
  MarkFrozenDaysSeenResponse,
  StreakStatus,
  SubmitDailyChallengeResultsParams,
  SubmitDailyChallengeResultsResponse,
} from './types'

export const streakAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStreakStatus: build.query<StreakStatus, string>({
      async queryFn(date) {
        return toRtkQueryResult(await streakService.getStatus(date))
      },
      providesTags: ['streak'],
      // потраченные заморозки, о которых ещё не сказали (например, задание
      // выполнено на другом устройстве или прошлый POST seen не дошёл), —
      // показываем модалку «Стрик заморожен»; повторы отсекает appSlice
      async onQueryStarted(_date, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled.catch(() => ({ data: null }))
        if (!data) return

        const frozen = getStreakFrozenInfo(data, data.current_streak)
        if (frozen) {
          dispatch(appActions.showStreakFrozen(frozen))
        }
      },
    }),

    getDailyChallenge: build.query<DailyChallengeResponse, string>({
      async queryFn(date) {
        return toRtkQueryResult(await streakService.getDailyChallenge(date))
      },
      providesTags: ['dailyChallenge'],
    }),

    // ответы «Помню»/«Не помню» задания дня одним пакетом. Бэкенд сам двигает
    // карточки по коробкам и меняет их статус: кэш списков карточек по ответу
    // синхронизирует CardsRepetition (syncItemsStatusInCache), а смена статуса
    // может пересечь порог достижений CARDS_READY и CARDS_MASTERED (карточка
    // дошла до последней ступени повторения)
    submitDailyChallengeResults: build.mutation<
      SubmitDailyChallengeResultsResponse,
      SubmitDailyChallengeResultsParams
    >({
      async queryFn(params) {
        return toRtkQueryResult(
          await streakService.submitDailyChallengeResults(params)
        )
      },
      invalidatesTags: ['achievements'],
    }),

    // завершение задания дня — по контракту бэкенда идемпотентно для одной
    // и той же даты, поэтому здесь достаточно просто дождаться ответа и
    // показать модалку успеха; повторный вызов с той же датой безопасен
    completeStreak: build.mutation<CompleteStreakResponse, string>({
      async queryFn(date) {
        return toRtkQueryResult(await streakService.complete(date))
      },
      // завершение стрика может пересечь порог достижения по метрике
      // STREAK_LONGEST — просим перечитать список достижений
      invalidatesTags: ['streak', 'dailyChallenge', 'achievements'],
      async onQueryStarted(_date, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled.catch(() => ({ data: null }))
        if (!data) return

        // заморозки тратятся только при выполнении задания после пропуска —
        // модалка «Стрик заморожен» показывается раньше модалки успеха
        // (та ждёт её закрытия) и показывает серию до сегодняшнего +1
        const frozen = getStreakFrozenInfo(data, data.previous_streak)
        if (frozen) {
          dispatch(appActions.showStreakFrozen(frozen))
        }

        dispatch(
          appActions.setDailyStreakFreeze({
            earned: data.freeze_earned === true,
            motivationAt: getStreakFreezeMotivationTarget(data),
          })
        )
        dispatch(
          appActions.setDailyStreakAnimation({
            from: data.previous_streak,
            to: data.current_streak,
          })
        )
        dispatch(appActions.setShowDailyStreakSuccessModal(true))
      },
    }),

    // подтверждение показа модалки «Стрик заморожен»; идемпотентно. Ошибка
    // не критична: в этой сессии даты не вернутся (appSlice), при следующем
    // запуске GET /streak снова отдаст их и модалка покажется ещё раз
    markFrozenDaysSeen: build.mutation<MarkFrozenDaysSeenResponse, string[]>({
      async queryFn(dates) {
        return toRtkQueryResult(await streakService.markFrozenDaysSeen(dates))
      },
    }),
  }),
})

export const {
  useGetStreakStatusQuery,
  useGetDailyChallengeQuery,
  useLazyGetDailyChallengeQuery,
  useCompleteStreakMutation,
  useSubmitDailyChallengeResultsMutation,
  useMarkFrozenDaysSeenMutation,
} = streakAPI
