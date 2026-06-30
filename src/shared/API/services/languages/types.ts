export interface ILanguage {
  id: number
  name: string
  code: string
  emoji: string
}

export type LanguagesResponse = Record<string, ILanguage>
