export interface ILanguage {
  id: number
  name: string
  code: string
  emoji: string
  json?: Record<string, unknown> | null
  updated_at?: string
}

export type LanguagesResponse = Record<string, ILanguage>
