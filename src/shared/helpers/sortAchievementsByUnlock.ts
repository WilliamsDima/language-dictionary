import type { AchievementWithProgress } from '@/shared/API/services/achievements/types'

const toTime = (value: string | null) => {
  const time = value ? Date.parse(value) : NaN
  return Number.isNaN(time) ? Number.POSITIVE_INFINITY : time
}

// Порядок показа достижений (профиль и экран достижений): сначала открытые —
// по дате открытия, первое открытое на первом месте, каждое новое встаёт
// после уже открытых; за ними неоткрытые в том порядке, в котором их отдал
// бэкенд. Открытые без даты (не должно случаться) идут после датированных.
// При равенстве сохраняется исходный порядок ответа.
export const sortAchievementsByUnlock = (
  items: AchievementWithProgress[]
): AchievementWithProgress[] =>
  items
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      if (a.item.unlocked !== b.item.unlocked) {
        return a.item.unlocked ? -1 : 1
      }

      if (a.item.unlocked) {
        const timeA = toTime(a.item.unlocked_at)
        const timeB = toTime(b.item.unlocked_at)
        if (timeA !== timeB) return timeA < timeB ? -1 : 1
      }

      return a.index - b.index
    })
    .map(({ item }) => item)
