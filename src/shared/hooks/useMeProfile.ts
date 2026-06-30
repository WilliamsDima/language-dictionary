import { useMemo } from 'react'
import { useGetMeQuery } from '@/shared/API/services/me/MeQuery'
import { useGetLanguagesQuery } from '@/shared/API/services/languages/LanguagesQuery'
import type { ILanguage } from '@/shared/API/services/languages/types'

export const useMeProfile = () => {
  const { data: meData, ...rest } = useGetMeQuery()
  const { data: allLanguages = [] } = useGetLanguagesQuery()

  const mappedLanguages = useMemo(
    (): ILanguage[] =>
      (meData?.languages ?? [])
        .map((id) => allLanguages.find((l) => l.id === id))
        .filter((l): l is ILanguage => Boolean(l)),
    [meData?.languages, allLanguages]
  )

  const nativeLanguage = useMemo(
    () => allLanguages.find((l) => l.id === meData?.native_language_id) ?? null,
    [meData?.native_language_id, allLanguages]
  )

  const profile = useMemo(() => {
    if (!meData) return undefined
    return {
      uid: meData.google_uid,
      name: meData.name,
      email: meData.email,
      image: meData.image ?? '',
      dateRegistration: new Date(meData.created_at),
      languages: mappedLanguages,
      nativeLanguage,
    }
  }, [meData, mappedLanguages, nativeLanguage])

  return { ...rest, data: profile }
}
