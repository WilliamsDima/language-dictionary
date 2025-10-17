import { useTranslation as useTranslationBase } from 'react-i18next'
import ru from './ru.json'

export interface IJSONLanguage {}

export type JsonData = {
  json: IJSONLanguage
  sha: string
}

type NestedKeys<T, Prefix extends string = ''> = {
  [K in Extract<keyof T, string>]: T[K] extends Record<string, any>
    ? NestedKeys<T[K], `${Prefix}${K}.`>
    : `${Prefix}${K}`
}[Extract<keyof T, string>]

export type I18NKeys = NestedKeys<typeof ru>
export type I18t = (key: I18NKeys, options?: any) => string

export const useTranslation = () => {
  const { t: tBase, ...rest } = useTranslationBase()

  const t: I18t = (key: I18NKeys, options?: any) =>
    tBase(key, options) as string

  return { t, ...rest }
}
