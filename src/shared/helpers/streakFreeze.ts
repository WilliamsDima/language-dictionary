import type {
  CompleteStreakResponse,
  StreakFrozenInfo,
  StreakStatus,
} from '@/shared/API/services/streak/types'

// заморозка начисляется за каждые 30 дней серии, мотивация «скоро
// заморозка» — на середине этого отрезка (15, 45, 75, …)
export const STREAK_FREEZE_PERIOD = 30
export const STREAK_FREEZE_MOTIVATION_DAY = 15

// данные модалки «Стрик заморожен», если есть потраченные и ещё не
// показанные заморозки. streak — серия, которую они сохранили: из ответа
// POST /streak/complete это previous_streak (до сегодняшнего +1), из
// GET /streak — current_streak
export const getStreakFrozenInfo = (
  data: StreakStatus,
  streak: number
): StreakFrozenInfo | null => {
  const dates = data.unseen_frozen_days ?? []

  if (dates.length === 0) return null

  return {
    dates,
    streak,
    left: data.freezes_available ?? 0,
  }
}

// день серии, на котором будет следующая заморозка, — если сегодняшнее
// выполнение задания впервые довело серию до 15, 45, 75, … дня, а заморозок
// ещё не максимум (иначе бэкенд отдаёт next_freeze_at_streak = null)
export const getStreakFreezeMotivationTarget = (
  data: CompleteStreakResponse
): number | null => {
  const nextFreezeAt = data.next_freeze_at_streak

  if (nextFreezeAt === null || nextFreezeAt === undefined) return null
  if (data.previous_streak === data.current_streak) return null

  return data.current_streak % STREAK_FREEZE_PERIOD ===
    STREAK_FREEZE_MOTIVATION_DAY
    ? nextFreezeAt
    : null
}

// добавляет в info даты, которых там ещё нет, исключая уже показанные в
// этой сессии; null — показывать нечего
export const mergeStreakFrozenInfo = (
  current: StreakFrozenInfo | null,
  next: StreakFrozenInfo,
  shownDates: readonly string[]
): StreakFrozenInfo | null => {
  const freshDates = next.dates.filter(
    (date) => !shownDates.includes(date) && !current?.dates.includes(date)
  )

  if (!current) {
    return freshDates.length > 0 ? { ...next, dates: freshDates } : null
  }

  // модалка уже ждёт показа — сохраняем серию из первого источника (ответ
  // complete приходит раньше перезапроса GET /streak и несёт серию до +1)
  return {
    ...current,
    dates: [...current.dates, ...freshDates],
    left: next.left,
  }
}
