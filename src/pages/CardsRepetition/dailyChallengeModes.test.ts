import { getDailyChallengeModeBehavior } from './dailyChallengeModes'

describe('getDailyChallengeModeBehavior', () => {
  it('maps known modes to show variant', () => {
    expect(getDailyChallengeModeBehavior('WORD_TO_TRANSLATE')).toEqual({
      showVariant: 'word_only',
    })
    expect(getDailyChallengeModeBehavior('TRANSLATE_TO_WORD')).toEqual({
      showVariant: 'translate_only',
    })
  })

  it('returns undefined for missing or unknown mode', () => {
    expect(getDailyChallengeModeBehavior()).toBeUndefined()
    expect(getDailyChallengeModeBehavior('')).toBeUndefined()
    expect(getDailyChallengeModeBehavior('LISTENING')).toBeUndefined()
    expect(getDailyChallengeModeBehavior('toString')).toBeUndefined()
  })
})
