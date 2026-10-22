import { describe, expect, it } from '@jest/globals'
import { sortAchievementsByUnlock } from './sortAchievementsByUnlock'
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
  progress_current: 0,
  progress_percent: 0,
  unlocked: false,
  unlocked_at: null,
  seen: true,
  ...overrides,
})

const ids = (items: AchievementWithProgress[]) => items.map((item) => item.id)

describe('sortAchievementsByUnlock', () => {
  it('ставит открытые первыми по дате открытия, неоткрытые — в исходном порядке', () => {
    const items = [
      makeAchievement({ id: 1 }),
      makeAchievement({
        id: 2,
        unlocked: true,
        unlocked_at: '2026-10-10T10:00:00Z',
      }),
      makeAchievement({ id: 3 }),
      makeAchievement({
        id: 4,
        unlocked: true,
        unlocked_at: '2026-09-01T10:00:00Z',
      }),
      makeAchievement({ id: 5 }),
    ]

    expect(ids(sortAchievementsByUnlock(items))).toEqual([4, 2, 1, 3, 5])
  })

  it('новое открытое встаёт после уже открытых', () => {
    const items = [
      makeAchievement({
        id: 1,
        unlocked: true,
        unlocked_at: '2026-10-20T10:00:00Z',
      }),
      makeAchievement({
        id: 2,
        unlocked: true,
        unlocked_at: '2026-10-01T10:00:00Z',
      }),
      makeAchievement({ id: 3 }),
    ]

    expect(ids(sortAchievementsByUnlock(items))).toEqual([2, 1, 3])
  })

  it('открытые без даты — после датированных, порядок при равенстве стабилен', () => {
    const items = [
      makeAchievement({ id: 1, unlocked: true, unlocked_at: null }),
      makeAchievement({
        id: 2,
        unlocked: true,
        unlocked_at: '2026-10-01T10:00:00Z',
      }),
      makeAchievement({
        id: 3,
        unlocked: true,
        unlocked_at: '2026-10-01T10:00:00Z',
      }),
      makeAchievement({ id: 4, unlocked: true, unlocked_at: null }),
    ]

    expect(ids(sortAchievementsByUnlock(items))).toEqual([2, 3, 1, 4])
  })

  it('не мутирует исходный массив', () => {
    const items = [
      makeAchievement({ id: 1 }),
      makeAchievement({
        id: 2,
        unlocked: true,
        unlocked_at: '2026-10-01T10:00:00Z',
      }),
    ]

    sortAchievementsByUnlock(items)

    expect(ids(items)).toEqual([1, 2])
  })
})
