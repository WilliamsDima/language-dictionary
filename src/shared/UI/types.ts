import type { I18NKeys } from '../i18n/types'

export type SelectOptionValue = string | number

export type SelectOption = {
  value: SelectOptionValue
  label: string
  iconUrl?: string
  keyTranslate: I18NKeys
}
