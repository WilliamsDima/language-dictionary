import { baseApi } from '@/shared/API/baseApi'
import { toRtkQueryResult } from '@/shared/API/RTK/rtk'
import { metricsService } from './MetricsService'
import type { LogEventPayload } from './types'

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
  }),
})

export const { useLogMetricEventMutation } = metricsAPI
