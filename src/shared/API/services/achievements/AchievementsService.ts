import { request } from '@/shared/API/request'
import type { AchievementsResponse } from './types'

class AchievementsService {
  getAchievements() {
    return request<AchievementsResponse>('/achievements', { method: 'GET' })
  }
}

export const achievementsService = new AchievementsService()
