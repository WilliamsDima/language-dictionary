import type { IItem } from '@/entities/Item/model/item'
import { PRACTICE_MODES } from '@/entities/PracticeMode/model/practiceMode'
import {
  buildSessionCards,
  buildSessionSteps,
  formatDuration,
  getNextQuestionIndex,
  getPlayableCards,
  getSessionCompletedEvent,
} from './practiceSession'

const makeItem = (id: number): IItem => ({
  id,
  date: '2026-10-25',
  description: '',
  language: 'en',
  items: [{ id, word: `word ${id}`, translate: `перевод ${id}` }],
  status: 'STUDY',
})

const items = Array.from({ length: 30 }, (_, i) => makeItem(i + 1))

describe('getSessionCompletedEvent', () => {
  it.each(['flashcards', 'matching', 'listening'] as const)(
    'reports the %s mode with its contract value',
    (modeId) => {
      expect(getSessionCompletedEvent(modeId)).toEqual({
        type: 'practice_session_completed',
        meta: { mode: modeId },
      })
    }
  )

  it.each(['sentence', 'pronunciation'] as const)(
    'does not report the %s mode the backend does not accept',
    (modeId) => {
      expect(getSessionCompletedEvent(modeId)).toBeNull()
    }
  )

  it('makes the decision for every ready mode', () => {
    PRACTICE_MODES.forEach((mode) => {
      expect(!!getSessionCompletedEvent(mode.id)).toBe(!mode.isComingSoon)
    })
  })
})

describe('practiceSession', () => {
  it('keeps every card when the limit is ALL', () => {
    const cards = buildSessionCards(items, 'ALL')

    expect(cards).toHaveLength(items.length)
    expect([...cards].map((it) => it.id).sort((a, b) => a - b)).toEqual(
      items.map((it) => it.id)
    )
  })

  it('cuts the set to the limit without duplicates', () => {
    const cards = buildSessionCards(items, 20)
    const ids = cards.map((it) => it.id)

    expect(cards).toHaveLength(20)
    expect(new Set(ids).size).toBe(20)
    expect(ids.every((id) => id >= 1 && id <= 30)).toBe(true)
  })

  it('does not mutate the source list', () => {
    const source = items.slice(0, 5)
    buildSessionCards(source, 'ALL')

    expect(source.map((it) => it.id)).toEqual([1, 2, 3, 4, 5])
  })

  it('makes one step per card by default and uses group builders', () => {
    const source = items.slice(0, 4)
    const Question = () => null

    expect(buildSessionSteps(source, undefined)).toEqual(
      source.map((it) => [it])
    )
    expect(
      buildSessionSteps(source, { kind: 'card', Question })
    ).toHaveLength(4)
    expect(
      buildSessionSteps(source, {
        kind: 'group',
        Question,
        buildGroups: (cards) => [cards.slice(0, 2), cards.slice(2)],
      }).map((it) => it.length)
    ).toEqual([2, 2])
  })

  it('keeps only playable cards when the mode has a condition', () => {
    const source = items.slice(0, 4)
    const Question = () => null

    expect(getPlayableCards(source, source, undefined)).toBe(source)
    expect(getPlayableCards(source, source, { kind: 'card', Question })).toBe(
      source
    )
    expect(
      getPlayableCards(source, items, {
        kind: 'card',
        Question,
        isCardPlayable: (card, pool) =>
          card.id % 2 === 0 && pool.length === items.length,
      }).map((it) => it.id)
    ).toEqual([2, 4])
  })

  it('formats durations as m:ss', () => {
    expect(formatDuration(0)).toBe('0:00')
    expect(formatDuration(9_999)).toBe('0:09')
    expect(formatDuration(75_000)).toBe('1:15')
    expect(formatDuration(-5)).toBe('0:00')
  })

  it('moves to the next question only once per answer', () => {
    expect(getNextQuestionIndex(0, 0)).toBe(1)
    // второе нажатие по уже отвеченному вопросу 0
    expect(getNextQuestionIndex(1, 0)).toBe(1)
  })
})
