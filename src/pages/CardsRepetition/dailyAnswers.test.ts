import {
  getDailyAnswersStats,
  getDailySuccessPercent,
  getNextUnansweredIndex,
  toDailyChallengeResults,
} from './dailyAnswers'

const slides = [1, 2, 3, 4].map((id) => ({ item: { id } }))

describe('dailyAnswers', () => {
  it('builds one result per answered card', () => {
    expect(toDailyChallengeResults({})).toEqual([])
    expect(toDailyChallengeResults({ 1: true, 3: false })).toEqual([
      { card_id: 1, correct: true },
      { card_id: 3, correct: false },
    ])
  })

  it('counts known and unknown answers', () => {
    expect(getDailyAnswersStats({})).toEqual({ known: 0, unknown: 0 })
    expect(getDailyAnswersStats({ 1: true, 2: false, 3: true })).toEqual({
      known: 2,
      unknown: 1,
    })
  })

  it('computes the rounded share of known answers', () => {
    expect(getDailySuccessPercent({ known: 0, unknown: 0 })).toBe(0)
    expect(getDailySuccessPercent({ known: 4, unknown: 1 })).toBe(80)
    expect(getDailySuccessPercent({ known: 2, unknown: 1 })).toBe(67)
    expect(getDailySuccessPercent({ known: 15, unknown: 0 })).toBe(100)
    expect(getDailySuccessPercent({ known: 0, unknown: 20 })).toBe(0)
  })

  it('finds the next unanswered slide, wrapping around', () => {
    expect(getNextUnansweredIndex(slides, { 1: true }, 0)).toBe(1)
    // карточка 2 пропущена свайпом, отвечены 1, 3, 4 — возвращаемся к ней
    expect(getNextUnansweredIndex(slides, { 1: true, 3: true, 4: false }, 3)).toBe(1)
    expect(
      getNextUnansweredIndex(slides, { 1: true, 2: true, 3: true, 4: false }, 3)
    ).toBe(-1)
  })
})
