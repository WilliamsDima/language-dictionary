import { baseApi } from '@/shared/API/baseApi'
import { toRtkQueryResult } from '@/shared/API/RTK/rtk'
import { metricsService } from './MetricsService'
import type { LogEventPayload, YearStatsResponse } from './types'

export const metricsAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // фоновая метрика — не критичная операция, поэтому единственный побочный
    // эффект тут это перечитать достижения (событие может пересечь порог
    // метрики, например TRAININGS_COUNT); сетевая ошибка не должна ничего
    // ломать в основном сценарии — вызывающий код не обязан ждать ответ
    logMetricEvent: build.mutation<void, LogEventPayload>({
      async queryFn(payload) {
        return toRtkQueryResult(await metricsService.logEvent(payload))
      },
      invalidatesTags: ['achievements'],
    }),
    // "итоги года" — полностью серверная агрегация (event-sourced метрики +
    // стрики), клиент только отображает готовые числа
    getYearStats: build.query<YearStatsResponse, void>({
      async queryFn() {
        return toRtkQueryResult(await metricsService.getYearStats())
      },
    }),
  }),
})

export const { useLogMetricEventMutation, useGetYearStatsQuery } = metricsAPI
