import { APP_LATEST_RELEASE_URL } from '@/shared/constants/app'
import { parseLatestRelease } from './helpers'
import type { LatestReleaseDTO } from './types'

class AppReleaseService {
  // публичный статический файл на сервере — идём мимо API-клиента (без
  // токена и базового URL API). Любая ошибка (404 до первой публикации,
  // нет сети, битый JSON) тихо означает "обновления нет"
  async getLatest(): Promise<LatestReleaseDTO | null> {
    try {
      const response = await fetch(APP_LATEST_RELEASE_URL, {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) return null

      return parseLatestRelease(await response.json())
    } catch {
      return null
    }
  }
}

export const appReleaseService = new AppReleaseService()
