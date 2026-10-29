import React, { FC, memo, useCallback, useMemo, useRef, useState } from 'react'
import { Animated, View } from 'react-native'
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import AnswerButtons from '@/shared/UI/AnswerButtons/AnswerButtons'
import { useTranslation } from '@/shared/i18n/types'
import type { PracticeQuestionProps } from '../../model/types'
import FlashcardWord from './UI/FlashcardWord/FlashcardWord'
import FlashcardActions from './UI/FlashcardActions/FlashcardActions'
import { styles } from './Flashcards.styles'

// тап — не дальше TAP_MAX_DISTANCE (px), иначе это скролл содержимого
const TAP_MAX_DISTANCE = 10
const FLIP_HALF_DURATION_MS = 180

// режим «Карточки»: показывается одна сторона карточки, тап или
// «Проверить» переворачивает её, после переворота — «Не помню» / «Помню»
const Flashcards: FC<PracticeQuestionProps> = ({
  card,
  showVariant,
  onAnswer,
}) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const { t } = useTranslation()

  const flipAnimation = useRef(new Animated.Value(0)).current
  const isFlipAnimating = useRef(false)

  const isWordFirst = useMemo(() => showVariant !== 'translate_only', [
    showVariant,
  ])

  const rotateY = useMemo(
    () =>
      flipAnimation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: ['-90deg', '0deg', '90deg'],
      }),
    [flipAnimation]
  )

  const cardStyle = useMemo(
    () => [styles.card, { transform: [{ perspective: 1200 }, { rotateY }] }],
    [rotateY]
  )

  const btnClasses = useMemo(() => ({ textBtn: styles.btnText }), [])

  const isDescriptionVisible = useMemo(
    () => isFlipped && !!card.description,
    [card.description, isFlipped]
  )

  const flipCard = useCallback(() => {
    if (isFlipAnimating.current) {
      return
    }

    isFlipAnimating.current = true

    Animated.timing(flipAnimation, {
      toValue: 1,
      duration: FLIP_HALF_DURATION_MS,
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped((prevState) => !prevState)
      flipAnimation.setValue(-1)

      Animated.timing(flipAnimation, {
        toValue: 0,
        duration: FLIP_HALF_DURATION_MS,
        useNativeDriver: true,
      }).start(() => {
        isFlipAnimating.current = false
      })
    })
  }, [flipAnimation])

  // тап жестом RNGH, а не TouchableOpacity вокруг ScrollView — так тап и
  // скролл длинной карточки не перехватывают друг друга
  const tapGesture = useMemo(() => {
    return Gesture.Tap()
      .maxDistance(TAP_MAX_DISTANCE)
      .runOnJS(true)
      .onEnd((_event, success) => {
        if (success) {
          flipCard()
        }
      })
  }, [flipCard])

  const onRemember = useCallback(() => {
    onAnswer(true)
  }, [onAnswer])

  const onDontRemember = useCallback(() => {
    onAnswer(false)
  }, [onAnswer])

  return (
    <View style={styles.wrapper}>
      <GestureDetector gesture={tapGesture}>
        <View style={styles.cardTouchable}>
          <Animated.View style={cardStyle}>
            <ScrollView
              style={styles.words}
              contentContainerStyle={styles.wordsContent}
              showsVerticalScrollIndicator
            >
              {card.items.map((it) => (
                <FlashcardWord
                  key={it.id}
                  front={isWordFirst ? it.word : it.translate}
                  back={isWordFirst ? it.translate : it.word}
                  isFlipped={isFlipped}
                />
              ))}

              {isDescriptionVisible ? (
                <Text style={styles.description}>{card.description}</Text>
              ) : (
                <></>
              )}
            </ScrollView>
          </Animated.View>
        </View>
      </GestureDetector>

      <FlashcardActions card={card} />

      <View style={styles.footer}>
        {isFlipped ? (
          <AnswerButtons
            onRemember={onRemember}
            onDontRemember={onDontRemember}
          />
        ) : (
          <Button style={styles.btn} classes={btnClasses} onPress={flipCard}>
            {t('cardsRepetition.check')}
          </Button>
        )}
      </View>
    </View>
  )
}

export default memo(Flashcards)
