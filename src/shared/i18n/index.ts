import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import type { TranslationKeys } from '../store/slice/appSlice'
import type { ILanguage } from '../API/services/languages/types'
import type { IJSONLanguage, JsonData } from './types'
import { setAsyncLocal } from '../helpers/asyncStorage'
import { LOCAL_KEYS } from '../constants/localStorage'
import ru from './ru.json'
import en from './en.json'

// офлайн/error-фолбэк переводов интерфейса — используется, когда
// `GET /languages` недоступен или у языка нет заполненного `json` на бэкенде
const localTranslations: Partial<Record<TranslationKeys, IJSONLanguage>> = {
  ru,
  en,
}

const hasTranslationJson = (
  json: ILanguage['json']
): json is Record<string, unknown> => !!json && Object.keys(json).length > 0

export const getLanguageJson = async (
  lang: TranslationKeys,
  apiLanguages?: ILanguage[]
): Promise<JsonData | { error: true }> => {
  try {
    const apiLanguage = apiLanguages?.find((item) => item.code === lang)

    if (hasTranslationJson(apiLanguage?.json)) {
      return { json: apiLanguage.json as IJSONLanguage, sha: 'api' }
    }

    const localJson = localTranslations[lang]
    if (localJson) {
      return { json: localJson, sha: 'local' }
    }

    return { error: true }
  } catch (error) {
    console.log('getLanguageJson error', error)
    return { error: true }
  }
}

export const initI18n = () => {
  if (i18n.isInitialized) return

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    lng: 'ru',
    fallbackLng: 'ru',
    resources: {
      ru: {
        translation: ru,
      },
      en: {
        translation: en,
      },
    },
    interpolation: { escapeValue: false },
  })
}

initI18n()

// приоритет — перевод конкретного языка из ответа `GET /languages`
// (`apiLanguages`, уже зарезолвленного вызывающим компонентом через
// `useInterfaceLanguages`/`useGetLanguagesQuery`); если для языка нет данных
// с бэкенда (нет сети, ошибка запроса, пустой `json`) — локальный бандл
export const changeLanguage = async (
  lang: TranslationKeys,
  apiLanguages?: ILanguage[]
) => {
  const data = await getLanguageJson(lang, apiLanguages)
  if ('error' in data) return

  i18n.addResourceBundle(lang, 'translation', data.json, true, true)

  await i18n.changeLanguage(lang)
  await setAsyncLocal(LOCAL_KEYS.appLanguage, lang)
}

export default i18n
