import { describe, expect, it } from '@jest/globals'
import { getUnseenAchievements } from './getUnseenAchievements'
import type { AchievementWithProgress } from '@/shared/API/services/achievements/types'

const makeAchievement = (
  overrides: Partial<AchievementWithProgress>
): AchievementWithProgress => ({
  id: 1,
  code: 'first_card',
  title: 'Первые шаги',
  description: 'Создайте свою первую карточку',
  icon: '🌱',
  color_from: '#4FACFE',
  color_to: '#00F2FE',
  metric: 'CARDS_CREATED',
  threshold: 1,
  sort_order: 1,
  is_active: true,
  created_at: '2026-07-07T00:00:00Z',
  updated_at: '2026-07-07T00:00:00Z',
  progress_current: 1,
  progress_percent: 100,
  unlocked: false,
  unlocked_at: null,
  seen: false,
  ...overrides,
})

const EMPTY = new Set<number>()

describe('getUnseenAchievements', () => {
  it('возвращает пустой массив, пока данных нет', () => {
    expect(getUnseenAchievements(undefined, EMPTY)).toEqual([])
    expect(getUnseenAchievements([], EMPTY)).toEqual([])
  })

  it('возвращает открытые и не просмотренные уже на первом снимке', () => {
    const items = [
      makeAchievement({ id: 1, code: 'a', unlocked: true, seen: false }),
      makeAchievement({ id: 2, code: 'b', unlocked: true, seen: true }),
      makeAchievement({ id: 3, code: 'c', unlocked: false }),
    ]

    expect(getUnseenAchievements(items, EMPTY).map((item) => item.id)).toEqual([
      1,
    ])
  })

  it('исключает уже показанные в текущей сессии', () => {
    const items = [
      makeAchievement({ id: 1, code: 'a', unlocked: true }),
      makeAchievement({ id: 2, code: 'b', unlocked: true }),
    ]

    expect(
      getUnseenAchievements(items, new Set([1])).map((item) => item.id)
    ).toEqual([2])
  })

  it('сортирует по unlocked_at, затем по sort_order и id', () => {
    const items = [
      makeAchievement({
        id: 3,
        code: 'c',
        unlocked: true,
        unlocked_at: '2026-07-09T00:00:00Z',
      }),
      makeAchievement({
        id: 2,
        code: 'b',
        unlocked: true,
        sort_order: 2,
        unlocked_at: '2026-07-08T00:00:00Z',
      }),
      makeAchievement({
        id: 1,
        code: 'a',
        unlocked: true,
        sort_order: 1,
        unlocked_at: '2026-07-08T00:00:00Z',
      }),
      makeAchievement({ id: 4, code: 'd', unlocked: true, unlocked_at: null }),
    ]

    expect(getUnseenAchievements(items, EMPTY).map((item) => item.id)).toEqual([
      1, 2, 3, 4,
    ])
  })

  it('убирает дубли по id и code', () => {
    const items = [
      makeAchievement({ id: 1, code: 'a', unlocked: true }),
      makeAchievement({ id: 1, code: 'a', unlocked: true }),
      makeAchievement({ id: 2, code: 'a', unlocked: true }),
    ]

    expect(getUnseenAchievements(items, EMPTY).map((item) => item.id)).toEqual([
      1,
    ])
  })
})
