import { useMemo } from 'react'
import { useGetLanguagesQuery } from '@/shared/API/services/languages/LanguagesQuery'
import type { ILanguage } from '@/shared/API/services/languages/types'

// резолвит код языка карточки (как он хранится в сторе) в полноценный ILanguage
// (имя, эмодзи) для рендера — карточка на бэкенде и в кэше хранит только code
export const useLanguageByCode = (code?: string): ILanguage | undefined => {
  const { data: languages = [] } = useGetLanguagesQuery()

  return useMemo(
    () => languages.find((lang) => lang.code === code),
    [languages, code]
  )
}
