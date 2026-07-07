import { request } from '@/shared/API/request'
import type { AppConfigDTO } from './types'

class AppConfigService {
  get() {
    return request<AppConfigDTO>('/app-config', { method: 'GET' })
  }
}

export const appConfigService = new AppConfigService()
