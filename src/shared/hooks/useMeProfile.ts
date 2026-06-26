import { useMemo } from 'react'
import { useGetMeQuery } from '@/shared/API/services/me/MeQuery'
import { languages } from '@/shared/json/languages'
import type { ILanguage } from '@/shared/json/languages'

const mapLanguageIdsToList = (ids?: number[]): ILanguage[] =>
  (ids ?? [])
    .map((id) => languages.find((lang) => lang.id === id))
    .filter((lang): lang is ILanguage => Boolean(lang))

export const useMeProfile = () => {
  const { data, ...rest } = useGetMeQuery()

  const mappedLanguages = useMemo(
    () => mapLanguageIdsToList(data?.languages),
    [data?.languages]
  )

  const profile = useMemo(() => {
    if (!data) return undefined
    return {
      uid: data.google_uid,
      name: data.name,
      email: data.email,
      image: data.image ?? '',
      dateRegistration: new Date(data.created_at),
      languages: mappedLanguages,
    }
  }, [data, mappedLanguages])

  return { ...rest, data: profile }
}
