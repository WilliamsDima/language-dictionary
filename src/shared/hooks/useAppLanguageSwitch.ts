import { useCallback, useState } from 'react'
import { useActions } from './useActions'
import { useAppSelector } from './useStore'
import { useInterfaceLanguages } from './useInterfaceLanguages'
import { changeLanguage } from '@/shared/i18n'
import type { AppLanguageType } from '@/shared/store/slice/appSlice'

// Общая логика применения языка интерфейса — переиспользуется на экране
// авторизации и в настройках, чтобы не дублировать переключение i18n
export const useAppLanguageSwitch = () => {
  const { setAppLanguage } = useActions()
  const { appLanguage } = useAppSelector((store) => store.app)
  const [loading, setLoading] = useState(false)
  const { languages, apiLanguages } = useInterfaceLanguages()

  const onSelectLanguage = useCallback(
    async (lang: AppLanguageType) => {
      if (lang.code === appLanguage?.code) {
        return
      }

      setLoading(true)

      try {
        await changeLanguage(lang.code, apiLanguages)
        setAppLanguage(lang)
      } finally {
        setLoading(false)
      }
    },
    [apiLanguages, appLanguage?.code, setAppLanguage]
  )

  return { appLanguage, languages, loading, onSelectLanguage }
}
