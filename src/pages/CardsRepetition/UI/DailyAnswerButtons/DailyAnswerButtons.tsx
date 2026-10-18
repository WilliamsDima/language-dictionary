import React, { FC, memo, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import Button from '@/shared/UI/Button/Button'
import { useTranslation } from '@/shared/i18n/types'
import { useCardsRepetition } from '../../CardsContext'
import { styles } from './DailyAnswerButtons.styles'

type Props = {
  cardId: number
}

// ответ по карточке задания дня — доступен только после переворота
// (рендерится SlideItem); нажатие записывает ответ и листает дальше
const DailyAnswerButtons: FC<Props> = ({ cardId }) => {
  const { dailyAnswers, answerCard } = useCardsRepetition()
  const { t } = useTranslation()

  const answer = useMemo(() => {
    if (!(cardId in dailyAnswers)) return undefined
    return dailyAnswers[cardId] ? 'remember' : 'dont_remember'
  }, [cardId, dailyAnswers])

  styles.useVariants({ answer })

  const dontRememberClasses = useMemo(
    () => ({ textBtn: styles.textDontRemember }),
    []
  )
  const rememberClasses = useMemo(() => ({ textBtn: styles.textRemember }), [])

  const onDontRemember = useCallback(() => {
    answerCard(cardId, false)
  }, [answerCard, cardId])

  const onRemember = useCallback(() => {
    answerCard(cardId, true)
  }, [answerCard, cardId])

  return (
    <View style={styles.wrapper}>
      <Button
        style={styles.btnDontRemember}
        classes={dontRememberClasses}
        onPress={onDontRemember}
      >
        {t('cardsRepetition.dont_remember')}
      </Button>

      <Button
        style={styles.btnRemember}
        classes={rememberClasses}
        onPress={onRemember}
      >
        {t('cardsRepetition.remember')}
      </Button>
    </View>
  )
}

export default memo(DailyAnswerButtons)
