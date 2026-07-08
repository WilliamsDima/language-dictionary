import { useMemo } from 'react'
import { useGetLanguagesQuery } from '@/shared/API/services/languages/LanguagesQuery'
import type { ILanguage } from '@/shared/API/services/languages/types'
import { appLanguagesList } from '@/shared/constants/appLanguages'
import type {
  AppLanguageType,
  TranslationKeys,
} from '@/shared/store/slice/appSlice'

// языки интерфейса, для которых точно есть локальный офлайн-бандл переводов
// (см. src/shared/i18n) — минимальный фолбэк, доступный без сети
const localFallbackLanguages: AppLanguageType[] = [
  appLanguagesList.ru,
  appLanguagesList.en,
]

const hasInterfaceTranslation = (lang: ILanguage): boolean =>
  !!lang.json && Object.keys(lang.json).length > 0

const toAppLanguage = (lang: ILanguage): AppLanguageType => {
  const known = appLanguagesList[lang.code as TranslationKeys] as
    | AppLanguageType
    | undefined

  return {
    id: lang.id,
    code: lang.code as TranslationKeys,
    name: known?.name ?? lang.name,
    nativeName: known?.nativeName ?? lang.name,
    emoji: known?.emoji ?? lang.emoji,
  }
}

// резолвит список выбираемых языков интерфейса: приоритет — языки из
// `GET /languages`, у которых реально заполнен перевод (`json`); если API
// недоступен или ни у одного языка нет перевода — локальный офлайн-фолбэк
// (ru/en, зеркалящий src/shared/i18n/ru.json и en.json)
export const useInterfaceLanguages = () => {
  const { data: apiLanguages, isSuccess } = useGetLanguagesQuery()

  const translatedApiLanguages = useMemo(
    () => (apiLanguages ?? []).filter(hasInterfaceTranslation),
    [apiLanguages]
  )

  const isFromApi = useMemo(
    () => isSuccess && translatedApiLanguages.length > 0,
    [isSuccess, translatedApiLanguages]
  )

  const languages = useMemo(() => {
    if (!isFromApi) return localFallbackLanguages

    return translatedApiLanguages.map(toAppLanguage).sort((a, b) => a.id - b.id)
  }, [isFromApi, translatedApiLanguages])

  return { languages, apiLanguages: translatedApiLanguages, isFromApi }
}
