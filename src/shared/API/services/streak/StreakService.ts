import { request } from '@/shared/API/request'
import type {
  CompleteStreakResponse,
  DailyChallengeResponse,
  StreakStatus,
} from './types'

class StreakService {
  getStatus(date: string) {
    return request<StreakStatus>(`/streak?date=${date}`, { method: 'GET' })
  }

  getDailyChallenge(date: string) {
    return request<DailyChallengeResponse>(
      `/streak/daily-challenge?date=${date}`,
      { method: 'GET' }
    )
  }

  complete(date: string) {
    return request<CompleteStreakResponse>('/streak/complete', {
      method: 'POST',
      json: { date },
    })
  }
}

export const streakService = new StreakService()
