import { describe, expect, it } from '@jest/globals'
import {
  getStreakFreezeMotivationTarget,
  getStreakFrozenInfo,
  mergeStreakFrozenInfo,
} from './streakFreeze'
import type {
  CompleteStreakResponse,
  StreakStatus,
} from '@/shared/API/services/streak/types'

const makeStatus = (overrides: Partial<StreakStatus>): StreakStatus => ({
  current_streak: 10,
  longest_streak: 20,
  completed_today: false,
  last_completed_date: '2026-10-14',
  freezes_available: 1,
  max_freezes: 3,
  streak_state: 'active',
  frozen_days_pending: 0,
  next_freeze_at_streak: 30,
  unseen_frozen_days: [],
  ...overrides,
})

const makeComplete = (
  overrides: Partial<CompleteStreakResponse>
): CompleteStreakResponse => ({
  ...makeStatus({ streak_state: 'completed', completed_today: true }),
  previous_streak: 14,
  current_streak: 15,
  freeze_earned: false,
  frozen_days_used: 0,
  ...overrides,
})

describe('getStreakFrozenInfo', () => {
  it('returns null when there are no unseen frozen days', () => {
    expect(getStreakFrozenInfo(makeStatus({}), 10)).toBeNull()
  })

  it('returns null for a backend without freezes', () => {
    expect(
      getStreakFrozenInfo(
        makeStatus({ unseen_frozen_days: undefined, freezes_available: undefined }),
        10
      )
    ).toBeNull()
  })

  it('builds modal data from unseen days and remaining freezes', () => {
    expect(
      getStreakFrozenInfo(
        makeStatus({
          unseen_frozen_days: ['2026-10-15', '2026-10-16'],
          freezes_available: 1,
        }),
        10
      )
    ).toEqual({ dates: ['2026-10-15', '2026-10-16'], streak: 10, left: 1 })
  })
})

describe('getStreakFreezeMotivationTarget', () => {
  it('returns the next freeze day on day 15', () => {
    expect(getStreakFreezeMotivationTarget(makeComplete({}))).toBe(30)
  })

  it('works for day 45', () => {
    expect(
      getStreakFreezeMotivationTarget(
        makeComplete({
          previous_streak: 44,
          current_streak: 45,
          next_freeze_at_streak: 60,
        })
      )
    ).toBe(60)
  })

  it('ignores a repeated (idempotent) completion', () => {
    expect(
      getStreakFreezeMotivationTarget(
        makeComplete({ previous_streak: 15, current_streak: 15 })
      )
    ).toBeNull()
  })

  it('ignores other days', () => {
    expect(
      getStreakFreezeMotivationTarget(
        makeComplete({ previous_streak: 15, current_streak: 16 })
      )
    ).toBeNull()
  })

  it('ignores day 15 when freezes are already at max', () => {
    expect(
      getStreakFreezeMotivationTarget(
        makeComplete({ next_freeze_at_streak: null })
      )
    ).toBeNull()
  })
})

describe('mergeStreakFrozenInfo', () => {
  const info = { dates: ['2026-10-15'], streak: 10, left: 1 }

  it('drops dates already shown in this session', () => {
    expect(mergeStreakFrozenInfo(null, info, ['2026-10-15'])).toBeNull()
  })

  it('sets info when nothing is pending', () => {
    expect(mergeStreakFrozenInfo(null, info, [])).toEqual(info)
  })

  it('keeps the first streak value and appends new dates', () => {
    expect(
      mergeStreakFrozenInfo(
        info,
        { dates: ['2026-10-15', '2026-10-16'], streak: 11, left: 0 },
        []
      )
    ).toEqual({ dates: ['2026-10-15', '2026-10-16'], streak: 10, left: 0 })
  })
})
