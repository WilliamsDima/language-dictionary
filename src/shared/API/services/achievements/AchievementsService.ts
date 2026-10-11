import { request } from '@/shared/API/request'
import type { AchievementsResponse } from './types'

class AchievementsService {
  getAchievements() {
    return request<AchievementsResponse>('/achievements', { method: 'GET' })
  }

  // без тела — эндпоинт идемпотентный, повторный вызов безопасен
  submitAppReview() {
    return request<AchievementsResponse>('/achievements/app-review', {
      method: 'POST',
    })
  }

  // идемпотентно; чужие/ещё не открытые id бэкенд молча игнорирует
  markSeen(ids: number[]) {
    return request<AchievementsResponse>('/achievements/seen', {
      method: 'POST',
      json: { ids },
    })
  }
}

export const achievementsService = new AchievementsService()
