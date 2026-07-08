const REVIEW_EMOTION_BY_RATING: Record<number, string> = {
  1: '😢',
  2: '😕',
  3: '😐',
  4: '🙂',
  5: '🤩',
}

// эмодзи-эмоция, которая появляется под звёздами после выбора рейтинга —
// от грустной для низких оценок до восторженной для высоких
export const getReviewEmotion = (rating: number | null): string => {
  if (!rating) return ''

  return REVIEW_EMOTION_BY_RATING[rating] ?? ''
}
