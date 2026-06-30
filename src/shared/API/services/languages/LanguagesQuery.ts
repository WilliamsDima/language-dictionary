import { baseApi } from '@/shared/API/baseApi'
import { toRtkQueryResult } from '@/shared/API/RTK/rtk'
import { languageService } from './LanguageService'
import type { ILanguage } from '@/shared/API/services/languages/types'

export const languagesAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLanguages: build.query<ILanguage[], void>({
      async queryFn() {
        const result = await languageService.getAll()
        if (!result.ok) return toRtkQueryResult<ILanguage[]>(result)

        const list: ILanguage[] = Object.values(result.data).sort(
          (a, b) => a.id - b.id
        )
        return { data: list }
      },
      providesTags: ['languages'],
    }),
  }),
})

export const { useGetLanguagesQuery } = languagesAPI
