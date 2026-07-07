import { request } from '@/shared/API/request'
import type { LogEventPayload, YearStatsResponse } from './types'

class MetricsService {
  logEvent(payload: LogEventPayload) {
    return request<void>('/events', {
      method: 'POST',
      json: payload,
    })
  }

  getYearStats() {
    return request<YearStatsResponse>('/stats/year', { method: 'GET' })
  }
}

export const metricsService = new MetricsService()
