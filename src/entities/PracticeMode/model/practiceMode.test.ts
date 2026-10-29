import {
  PRACTICE_MODES,
  getPracticeMode,
  hasEnoughCardsForMode,
} from './practiceMode'

describe('practiceMode', () => {
  it('has unique mode ids and flashcards as the first ready mode', () => {
    const ids = PRACTICE_MODES.map((it) => it.id)

    expect(new Set(ids).size).toBe(ids.length)
    expect(PRACTICE_MODES[0].id).toBe('flashcards')
    expect(PRACTICE_MODES[0].isComingSoon).toBeFalsy()
  })

  it('finds a mode by id', () => {
    expect(getPracticeMode('listening')?.minCards).toBe(4)
  })

  it('checks the minimum number of cards', () => {
    const listening = getPracticeMode('listening')!

    expect(hasEnoughCardsForMode(listening, 3)).toBe(false)
    expect(hasEnoughCardsForMode(listening, 4)).toBe(true)
  })
})
