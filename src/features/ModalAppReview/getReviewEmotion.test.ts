import { getReviewEmotion } from './getReviewEmotion'

describe('getReviewEmotion', () => {
  it('returns empty string when rating is not selected', () => {
    expect(getReviewEmotion(null)).toBe('')
  })

  it('returns a sad emotion for the lowest rating', () => {
    expect(getReviewEmotion(1)).toBe('😢')
  })

  it('returns an excited emotion for the highest rating', () => {
    expect(getReviewEmotion(5)).toBe('🤩')
  })

  it('returns a different emotion for every rating value', () => {
    const emotions = [1, 2, 3, 4, 5].map((rating) => getReviewEmotion(rating))

    expect(new Set(emotions).size).toBe(5)
  })
})
