import React, { FC, memo, useCallback, useMemo } from 'react'
import type { IItem } from '@/entities/Item/model/item'
import type { ShowVariantListVale } from '@/shared/store/slice/userSlice'
import type { AnswersByCard } from '@/shared/helpers/answersStats'
import type { PracticeQuestionEntry } from '../../model/types'

type Props = {
  entry: PracticeQuestionEntry
  cards: IItem[]
  pool: IItem[]
  showVariant: ShowVariantListVale | null
  onAnswer: (answers: AnswersByCard) => void
  onMistake: () => void
}

// шаг сессии: вопрос режима по одной карточке (kind 'card') или по группе
// (kind 'group'). Ответ вопроса по карточке переводится в ответы по шагу
const PracticeStep: FC<Props> = ({
  entry,
  cards,
  pool,
  showVariant,
  onAnswer,
  onMistake,
}) => {
  const card = useMemo<IItem | undefined>(() => cards[0], [cards])

  const onCardAnswer = useCallback(
    (correct: boolean) => {
      if (!card) return

      onAnswer({ [card.id]: correct })
    },
    [card, onAnswer]
  )

  if (entry.kind === 'group') {
    return (
      <entry.Question
        cards={cards}
        pool={pool}
        showVariant={showVariant}
        onMistake={onMistake}
        onAnswer={onAnswer}
      />
    )
  }

  return card ? (
    <entry.Question
      card={card}
      pool={pool}
      showVariant={showVariant}
      onAnswer={onCardAnswer}
    />
  ) : (
    <></>
  )
}

export default memo(PracticeStep)
