import { request } from '@/shared/API/request'
import type { MeProfile, UpdateLanguagesPayload } from './types'

class MeService {
  getMe() {
    return request<MeProfile>('/me', { method: 'GET' })
  }

  updateLanguages({ languages, nativeLanguageId }: UpdateLanguagesPayload) {
    return request<MeProfile>('/me/languages', {
      method: 'PUT',
      json: { languages, native_language_id: nativeLanguageId },
    })
  }

  deleteMe() {
    return request<{ deleted: number }>('/me', { method: 'DELETE' })
  }
}

export const meService = new MeService()
