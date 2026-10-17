import { describe, expect, it } from '@jest/globals'
import { getHalfwayAchievements } from './getHalfwayAchievements'
import type { AchievementWithProgress } from '@/shared/API/services/achievements/types'

const makeAchievement = (
  overrides: Partial<AchievementWithProgress>
): AchievementWithProgress => ({
  id: 1,
  code: 'cards_10',
  title: 'Коллекционер',
  description: 'Создайте 10 карточек',
  icon: '📚',
  color_from: '#4FACFE',
  color_to: '#00F2FE',
  metric: 'CARDS_CREATED',
  threshold: 10,
  sort_order: 1,
  is_active: true,
  created_at: '2026-07-07T00:00:00Z',
  updated_at: '2026-07-07T00:00:00Z',
  progress_current: 5,
  progress_percent: 50,
  unlocked: false,
  unlocked_at: null,
  seen: false,
  ...overrides,
})

const EMPTY = new Set<number>()

const ids = (items: AchievementWithProgress[]) => items.map((item) => item.id)

describe('getHalfwayAchievements', () => {
  it('возвращает пустой массив, пока данных нет', () => {
    expect(getHalfwayAchievements(undefined, EMPTY)).toEqual([])
    expect(getHalfwayAchievements([], EMPTY)).toEqual([])
  })

  it('берёт только не открытые достижения с прогрессом от 50% до 100%', () => {
    const items = [
      makeAchievement({ id: 1, progress_current: 4, progress_percent: 40 }),
      makeAchievement({ id: 2, progress_current: 5, progress_percent: 50 }),
      makeAchievement({ id: 3, progress_current: 9, progress_percent: 90 }),
      makeAchievement({
        id: 4,
        progress_current: 10,
        progress_percent: 100,
        unlocked: true,
      }),
    ]

    expect(ids(getHalfwayAchievements(items, EMPTY))).toEqual([2, 3])
  })

  it('пропускает перепрыгнувшие сразу на 100% и открытые', () => {
    const items = [
      makeAchievement({ id: 1, progress_current: 10, progress_percent: 100 }),
      makeAchievement({ id: 2, progress_percent: 60, unlocked: true }),
    ]

    expect(getHalfwayAchievements(items, EMPTY)).toEqual([])
  })

  it('пропускает достижения без числового прогресса', () => {
    const items = [
      makeAchievement({ id: 1, threshold: 1, progress_current: 0, progress_percent: 0 }),
      makeAchievement({ id: 2, threshold: 0, progress_current: 0, progress_percent: 50 }),
      makeAchievement({ id: 3, progress_percent: Number.NaN }),
    ]

    expect(getHalfwayAchievements(items, EMPTY)).toEqual([])
  })

  it('исключает уже показанные', () => {
    const items = [makeAchievement({ id: 1 }), makeAchievement({ id: 2 })]

    expect(ids(getHalfwayAchievements(items, new Set([1])))).toEqual([2])
  })

  it('сортирует по sort_order, затем по id и убирает дубли', () => {
    const items = [
      makeAchievement({ id: 3, sort_order: 2 }),
      makeAchievement({ id: 2, sort_order: 1 }),
      makeAchievement({ id: 1, sort_order: 2 }),
      makeAchievement({ id: 2, sort_order: 1 }),
    ]

    expect(ids(getHalfwayAchievements(items, EMPTY))).toEqual([2, 1, 3])
  })
})
