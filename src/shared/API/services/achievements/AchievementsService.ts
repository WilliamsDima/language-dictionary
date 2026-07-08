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
}

export const achievementsService = new AchievementsService()
