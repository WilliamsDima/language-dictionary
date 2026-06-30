import { request } from '@/shared/API/request'
import type { LanguagesResponse } from './types'

class LanguageService {
  getAll() {
    return request<LanguagesResponse>('/languages', { method: 'GET' })
  }
}

export const languageService = new LanguageService()
