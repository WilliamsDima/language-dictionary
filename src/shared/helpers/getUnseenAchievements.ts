import type { AchievementWithProgress } from '@/shared/API/services/achievements/types'

const toTime = (value: string | null) => {
  const time = value ? Date.parse(value) : NaN
  return Number.isNaN(time) ? Number.POSITIVE_INFINITY : time
}

const compareAchievements = (
  a: AchievementWithProgress,
  b: AchievementWithProgress
) => {
  const byUnlockedAt = toTime(a.unlocked_at) - toTime(b.unlocked_at)
  if (byUnlockedAt !== 0 && !Number.isNaN(byUnlockedAt)) return byUnlockedAt

  if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order

  return a.id - b.id
}

// Очередь модалок разблокировки: открытые, но ещё не подтверждённые
// сервером (seen = false) достижения, без тех, что уже показаны в текущей
// сессии (excludedIds), без дублей по id/code, в стабильном порядке —
// по unlocked_at, затем sort_order, затем id.
export const getUnseenAchievements = (
  items: AchievementWithProgress[] | undefined,
  excludedIds: ReadonlySet<number>
): AchievementWithProgress[] => {
  if (!items) return []

  const unseen = items
    .filter((item) => item.unlocked && !item.seen && !excludedIds.has(item.id))
    .sort(compareAchievements)

  return unseen.reduce<{
    result: AchievementWithProgress[]
    ids: Set<number>
    codes: Set<string>
  }>(
    (acc, item) => {
      if (acc.ids.has(item.id) || acc.codes.has(item.code)) return acc

      acc.ids.add(item.id)
      acc.codes.add(item.code)
      acc.result.push(item)
      return acc
    },
    { result: [], ids: new Set(), codes: new Set() }
  ).result
}
