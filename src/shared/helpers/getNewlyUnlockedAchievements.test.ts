import { describe, expect, it } from '@jest/globals'
import { getNewlyUnlockedAchievements } from './getNewlyUnlockedAchievements'
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
  ...overrides,
})

describe('getNewlyUnlockedAchievements', () => {
  it('возвращает пустой массив, если предыдущего снимка не было', () => {
    const current = [makeAchievement({ unlocked: true })]

    expect(getNewlyUnlockedAchievements(undefined, current)).toEqual([])
  })

  it('находит достижения, разблокированные между снимками', () => {
    const previous = [
      makeAchievement({ code: 'first_card', unlocked: false }),
      makeAchievement({ code: 'streak_7', unlocked: true }),
    ]
    const current = [
      makeAchievement({ code: 'first_card', unlocked: true }),
      makeAchievement({ code: 'streak_7', unlocked: true }),
    ]

    const result = getNewlyUnlockedAchievements(previous, current)

    expect(result).toHaveLength(1)
    expect(result[0].code).toBe('first_card')
  })

  it('не возвращает уже ранее открытые достижения повторно', () => {
    const previous = [makeAchievement({ code: 'streak_7', unlocked: true })]
    const current = [makeAchievement({ code: 'streak_7', unlocked: true })]

    expect(getNewlyUnlockedAchievements(previous, current)).toEqual([])
  })

  it('не ломается на пустых массивах', () => {
    expect(getNewlyUnlockedAchievements([], [])).toEqual([])
  })
})
