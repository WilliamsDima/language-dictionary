import { baseApi } from '@/shared/API/baseApi'
import { appReleaseService } from './AppReleaseService'
import type { LatestReleaseDTO } from './types'

export const appReleaseAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // null — релиза нет или узнать не удалось; ошибкой запрос не завершается,
    // чтобы UI не показывал никаких состояний сбоя для фоновой проверки
    getLatestRelease: build.query<LatestReleaseDTO | null, void>({
      async queryFn() {
        return { data: await appReleaseService.getLatest() }
      },
    }),
  }),
})

export const { useGetLatestReleaseQuery } = appReleaseAPI
