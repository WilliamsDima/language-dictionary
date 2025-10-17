import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import axios from 'axios'
import { Base64 } from 'js-base64'

import { GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN } from '@env'
import type { TranslationKeys } from '../store/slice/appSlice'
import type { IJSONLanguage, JsonData } from './types'
import { setAsyncLocal } from '../helpers/asyncStorage'
import { LOCAL_KEYS } from '../constants/localStorage'

const cache: Record<string, IJSONLanguage> = {}

export const getLanguageJson = async (path: string) => {
  try {
    if (cache[path]) {
      return {
        json: cache[path],
      }
    }
    const res = await axios.get(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    const content = Base64.decode(res.data.content)
    const json = JSON.parse(content)
    const sha = res.data.sha

    cache[path] = json

    return { json, sha } as JsonData
  } catch (error) {
    console.log('getLanguageJson error', error)
    return { error: true }
  }
}

export const initI18n = () => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    lng: 'en', // стартовый язык
    fallbackLng: 'en',
    resources: {},
    interpolation: { escapeValue: false },
  })
}

export const changeLanguage = async (lang: TranslationKeys, path: string) => {
  const data = await getLanguageJson(path)
  if ('error' in data) return

  // Добавляем перевод
  i18n.addResourceBundle(lang, 'translation', data.json, true, true)

  // Меняем язык
  await i18n.changeLanguage(lang)
  await setAsyncLocal(LOCAL_KEYS.appLanguage, lang)
}

export default i18n
