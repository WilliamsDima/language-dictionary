import { request } from '@/shared/API/request'
import type { LogEventPayload } from './types'

class MetricsService {
  logEvent(payload: LogEventPayload) {
    return request<void>('/events', {
      method: 'POST',
      json: payload,
    })
  }
}

export const metricsService = new MetricsService()
