export type AchievementWithProgress = {
  id: number
  code: string
  title: string
  description: string
  icon: string
  color_from: string
  color_to: string
  metric: string
  threshold: number
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
  progress_current: number
  progress_percent: number
  unlocked: boolean
  unlocked_at: string | null
}

export type AchievementsResponse = {
  items: AchievementWithProgress[]
}
