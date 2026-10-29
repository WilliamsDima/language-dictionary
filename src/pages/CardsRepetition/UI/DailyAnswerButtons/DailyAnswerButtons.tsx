import React, { FC, memo, useCallback, useMemo } from 'react'
import AnswerButtons from '@/shared/UI/AnswerButtons/AnswerButtons'
import { useCardsRepetition } from '../../CardsContext'

type Props = {
  cardId: number
}

// ответ по карточке задания дня — доступен только после переворота
// (рендерится SlideItem); нажатие записывает ответ и листает дальше
const DailyAnswerButtons: FC<Props> = ({ cardId }) => {
  const { dailyAnswers, answerCard } = useCardsRepetition()

  const answer = useMemo(() => {
    if (!(cardId in dailyAnswers)) return undefined
    return dailyAnswers[cardId] ? 'remember' : 'dont_remember'
  }, [cardId, dailyAnswers])

  const onDontRemember = useCallback(() => {
    answerCard(cardId, false)
  }, [answerCard, cardId])

  const onRemember = useCallback(() => {
    answerCard(cardId, true)
  }, [answerCard, cardId])

  return (
    <AnswerButtons
      answer={answer}
      onRemember={onRemember}
      onDontRemember={onDontRemember}
    />
  )
}

export default memo(DailyAnswerButtons)
