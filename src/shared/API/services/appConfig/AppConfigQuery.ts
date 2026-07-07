import { baseApi } from '@/shared/API/baseApi'
import { toRtkQueryResult } from '@/shared/API/RTK/rtk'
import { appConfigService } from './AppConfigService'
import type { AppConfigDTO } from './types'

export const appConfigAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // публичный конфиг (в т.ч. year_in_review) — редко меняется, кэш RTK Query
    // общий для всех подписчиков (ProfileScreen гейтинг + ModalYearResult слайды)
    getAppConfig: build.query<AppConfigDTO, void>({
      async queryFn() {
        return toRtkQueryResult(await appConfigService.get())
      },
      providesTags: ['appConfig'],
    }),
  }),
})

export const { useGetAppConfigQuery } = appConfigAPI
