import type { AchievementWithProgress } from '@/shared/API/services/achievements/types'

const HALFWAY_PERCENT = 50
const FULL_PERCENT = 100
// при пороге 1 прогресс бывает только 0% или 100% — «половины пути» нет
const MIN_THRESHOLD = 2

// достижение с числовым прогрессом, ещё не открытое, на отметке ≥ 50%
export const isHalfwayAchievement = (item: AchievementWithProgress) =>
  !item.unlocked &&
  Number.isFinite(item.threshold) &&
  item.threshold >= MIN_THRESHOLD &&
  Number.isFinite(item.progress_percent) &&
  Number.isFinite(item.progress_current) &&
  item.progress_current < item.threshold &&
  item.progress_percent >= HALFWAY_PERCENT &&
  item.progress_percent < FULL_PERCENT

const compareAchievements = (
  a: AchievementWithProgress,
  b: AchievementWithProgress
) => {
  if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order

  return a.id - b.id
}

// Очередь уведомлений «Половина пути»: ещё не открытые достижения с
// прогрессом от 50% до 100%, без уже показанных (excludedIds), без дублей
// по id, в стабильном порядке — по sort_order, затем id. Открытые
// достижения сюда не попадают: если прогресс перепрыгнул сразу на 100%,
// пользователь увидит только модалку разблокировки.
export const getHalfwayAchievements = (
  items: AchievementWithProgress[] | undefined,
  excludedIds: ReadonlySet<number>
): AchievementWithProgress[] => {
  if (!items) return []

  return items
    .filter((item) => isHalfwayAchievement(item) && !excludedIds.has(item.id))
    .sort(compareAchievements)
    .filter((item, index, list) => list.findIndex((other) => other.id === item.id) === index)
}
