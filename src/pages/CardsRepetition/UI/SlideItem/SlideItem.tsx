import React, {
  FC,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { styles } from './SlideItem.styles'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { CardSlideType, useCardsRepetition } from '../../CardsContext'
import { width } from '@/shared/helpers/ScaleUtils'
import Button from '@/shared/UI/Button/Button'
import { runOnJS } from 'react-native-reanimated'
import { useTranslation } from '@/shared/i18n/types'

type Props = {
  item: CardSlideType
  index: number
}

// с какой длины фраза считается длинной и рендерится уменьшенным шрифтом
const LONG_TEXT_LENGTH = 20

type CardWordRowProps = {
  firstText: string
  secondText: string
  isFlipped: boolean
}

const CardWordRowBase: FC<CardWordRowProps> = ({
  firstText,
  secondText,
  isFlipped,
}) => {
  const text = useMemo(
    () => (isFlipped ? secondText : firstText),
    [isFlipped, firstText, secondText]
  )

  const isLong = useMemo(() => text.length > LONG_TEXT_LENGTH, [text])

  styles.useVariants({
    isFlipped,
    isLong,
  })

  return (
    <View style={styles.itemWordWrapper}>
      <View style={styles.itemWord}>
        <View style={styles.wrapperText}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </View>
  )
}

const CardWordRow = memo(CardWordRowBase)

const CardContent: FC<Props & { isFlipped: boolean }> = ({
  item,
  isFlipped,
}) => {
  // showVariant уже учитывает режим задания дня (см. CardsContext)
  const { liveItems, showVariant } = useCardsRepetition()

  const currentItem = useMemo(() => {
    return liveItems.find((it) => it.id === item?.item.id)
  }, [item, liveItems])

  return currentItem?.items.map((it) => {
    const firstText = showVariant === 'word_only' ? it.word : it.translate
    const secondText = showVariant === 'word_only' ? it.translate : it.word

    return (
      <CardWordRow
        key={it.id}
        firstText={firstText}
        secondText={secondText}
        isFlipped={isFlipped}
      />
    )
  })
}

const SlideItem: FC<Props> = (props) => {
  const { item, index } = props
  const [isFlipped, setIsFlipped] = useState(false)
  const { scrollX, nextSlide, swipeSlide, liveItems } = useCardsRepetition()
  const { t } = useTranslation()

  const flipAnimation = useRef(new Animated.Value(0)).current
  const isFlipAnimating = useRef(false)

  const currentItem = useMemo(() => {
    return liveItems.find((it) => it.id === item?.item.id)
  }, [item, liveItems])

  const opacity = useMemo(
    () =>
      scrollX.interpolate({
        inputRange: [(index - 1) * width, index * width, (index + 1) * width],
        outputRange: [0.1, 1, 0.1],
        extrapolate: 'clamp',
      }),
    [scrollX, index]
  )

  const rotateY = useMemo(
    () =>
      flipAnimation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: ['-90deg', '0deg', '90deg'],
      }),
    [flipAnimation]
  )

  const panGesture = useMemo(() => {
    return Gesture.Pan().onEnd((event) => {
      runOnJS(swipeSlide)(event.translationX)
    })
  }, [swipeSlide])

  const flipCard = useCallback(() => {
    if (isFlipAnimating.current) {
      return
    }

    isFlipAnimating.current = true

    Animated.timing(flipAnimation, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped((prevState) => !prevState)
      flipAnimation.setValue(-1)

      Animated.timing(flipAnimation, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start(() => {
        isFlipAnimating.current = false
      })
    })
  }, [flipAnimation])

  const btnClasses = useMemo(() => ({ textBtn: styles.btnText }), [])

  const itemStyle = useMemo(() => [styles.item, { opacity }], [opacity])

  const cardStyle = useMemo(
    () => [styles.card, { transform: [{ perspective: 1200 }, { rotateY }] }],
    [rotateY]
  )

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.wrapper}>
        <View style={styles.itemWrapper}>
          <Animated.View style={itemStyle}>
            <TouchableOpacity
              style={styles.cardTouchable}
              onPress={nextSlide}
              activeOpacity={1}
            >
              <Animated.View style={cardStyle}>
                <ScrollView
                  style={styles.itemWords}
                  contentContainerStyle={styles.contentContainerStyle}
                  showsVerticalScrollIndicator
                >
                  <CardContent isFlipped={isFlipped} {...props} />
                  {!!currentItem?.description && isFlipped ? (
                    <Text style={styles.description}>
                      {currentItem?.description}
                    </Text>
                  ) : (
                    <></>
                  )}
                </ScrollView>
              </Animated.View>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Button
                style={styles.btn}
                classes={btnClasses}
                onPress={flipCard}
              >
                {t('cardsRepetition.check')}
              </Button>
            </View>
          </Animated.View>
        </View>
      </View>
    </GestureDetector>
  )
}

export default memo(SlideItem)
