import { request } from '@/shared/API/request'
import type { MeProfile } from '@/shared/API/services/me/types'

class AuthService {
  googleSync(idToken: string) {
    return request<MeProfile>('/users/sync', {
      method: 'POST',
      authToken: idToken,
    })
  }
}

export const authService = new AuthService()
