export type MeProfile = {
  id: number
  google_uid: string
  name: string
  email: string
  image?: string
  languages?: number[]
  native_language_id?: number | null
  last_active_at: string | null
  created_at: string
}

export type UpdateLanguagesPayload = {
  languages: number[]
  nativeLanguageId: number | null
}
