import { request } from '@/shared/API/request'
import type { MeProfile } from './types'

class MeService {
  getMe() {
    return request<MeProfile>('/me', { method: 'GET' })
  }

  updateLanguages(languages: number[]) {
    return request<MeProfile>('/me/languages', {
      method: 'PUT',
      json: { languages },
    })
  }

  deleteMe() {
    return request<{ deleted: number }>('/me', { method: 'DELETE' })
  }
}

export const meService = new MeService()
