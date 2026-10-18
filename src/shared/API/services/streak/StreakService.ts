import { request } from '@/shared/API/request'
import type {
  CompleteStreakResponse,
  DailyChallengeResponse,
  MarkFrozenDaysSeenResponse,
  StreakStatus,
  SubmitDailyChallengeResultsParams,
  SubmitDailyChallengeResultsResponse,
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

  submitDailyChallengeResults(params: SubmitDailyChallengeResultsParams) {
    return request<SubmitDailyChallengeResultsResponse>(
      '/streak/daily-challenge/results',
      { method: 'POST', json: params }
    )
  }

  complete(date: string) {
    return request<CompleteStreakResponse>('/streak/complete', {
      method: 'POST',
      json: { date },
    })
  }

  markFrozenDaysSeen(dates: string[]) {
    return request<MarkFrozenDaysSeenResponse>('/streak/freezes/seen', {
      method: 'POST',
      json: { dates },
    })
  }
}

export const streakService = new StreakService()
