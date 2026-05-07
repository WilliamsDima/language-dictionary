import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import type { TranslationKeys } from '../store/slice/appSlice'
import type { IJSONLanguage, JsonData } from './types'
import { setAsyncLocal } from '../helpers/asyncStorage'
import { LOCAL_KEYS } from '../constants/localStorage'
import ru from './ru.json'

const cache: Record<string, IJSONLanguage> = {}

export const getLanguageJson = async (path: string) => {
  try {
    if (cache[path]) {
      return {
        json: cache[path],
      }
    }

    const json = ru

    cache[path] = json

    return { json, sha: 'local' } as JsonData
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
    },
    interpolation: { escapeValue: false },
  })
}

initI18n()

export const changeLanguage = async (lang: TranslationKeys, path: string) => {
  const data = await getLanguageJson(path)
  if ('error' in data) return

  i18n.addResourceBundle(lang, 'translation', data.json, true, true)

  await i18n.changeLanguage(lang)
  await setAsyncLocal(LOCAL_KEYS.appLanguage, lang)
}

export default i18n
