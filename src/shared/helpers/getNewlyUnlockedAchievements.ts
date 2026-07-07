import type { AchievementWithProgress } from '@/shared/API/services/achievements/types'

// Сравнивает предыдущий и текущий снимки списка достижений и возвращает те,
// что стали unlocked именно в текущем снимке. На первом снимке (previous
// не задан) ничего не возвращаем, чтобы не показывать уведомление о всех
// уже открытых достижениях сразу после первой загрузки экрана.
export const getNewlyUnlockedAchievements = (
  previous: AchievementWithProgress[] | undefined,
  current: AchievementWithProgress[]
): AchievementWithProgress[] => {
  if (!previous) return []

  const previousUnlockedCodes = new Set(
    previous.filter((item) => item.unlocked).map((item) => item.code)
  )

  return current.filter(
    (item) => item.unlocked && !previousUnlockedCodes.has(item.code)
  )
}
