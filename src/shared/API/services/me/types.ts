export type MeProfile = {
  id: number
  google_uid: string
  name: string
  email: string
  image?: string
  languages?: number[]
  last_active_at: string | null
  created_at: string
}
