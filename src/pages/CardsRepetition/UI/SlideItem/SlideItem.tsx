import React, { FC, memo, useMemo, useRef, useState } from 'react'
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
import { useAppSelector } from '@/shared/hooks/useStore'
import { runOnJS } from 'react-native-reanimated'

type Props = {
  item: CardSlideType
  index: number
}

type CardWordRowProps = {
  firstText: string
  secondText: string
  isFlipped: boolean
}

const CardWordRow: FC<CardWordRowProps> = ({
  firstText,
  secondText,
  isFlipped,
}) => {
  styles.useVariants({
    isFlipped,
  })

  return (
    <View style={styles.itemWordWrapper}>
      <View style={styles.itemWord}>
        <View style={styles.wrapperText}>
          <Text style={styles.text}>{isFlipped ? secondText : firstText}</Text>
        </View>
      </View>
    </View>
  )
}

const CardContent: FC<Props & { isFlipped: boolean }> = ({
  item,
  isFlipped,
}) => {
  const { filterCardsModal } = useAppSelector((store) => store.items)
  const { liveItems } = useCardsRepetition()

  const currentItem = useMemo(() => {
    return liveItems.find((it) => it.id === item?.item.id)
  }, [item, liveItems])

  return currentItem?.items.map((it) => {
    const firstText =
      filterCardsModal.showVariant === 'word_only' ? it.word : it.translate
    const secondText =
      filterCardsModal.showVariant === 'word_only' ? it.translate : it.word

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
  const { scrollX, nextSlide, swipeSlide, liveItems } = useCardsRepetition()

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

  const currentItem = useMemo(() => {
    return liveItems.find((it) => it.id === item?.item.id)
  }, [item, liveItems])

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.1, 1, 0.1],
    extrapolate: 'clamp',
  })

  const [isFlipped, setIsFlipped] = useState(false)
  const flipAnimation = useRef(new Animated.Value(0)).current
  const isFlipAnimating = useRef(false)

  const rotateY = flipAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-90deg', '0deg', '90deg'],
  })

  const panGesture = useMemo(() => {
    return Gesture.Pan().onEnd((event) => {
      runOnJS(swipeSlide)(event.translationX)
    })
  }, [swipeSlide])

  const flipCard = () => {
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
  }

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.wrapper}>
        <View style={styles.itemWrapper}>
          <Animated.View style={[styles.item, { opacity }]}>
            <TouchableOpacity onPress={nextSlide} activeOpacity={1}>
              <ScrollView
                style={styles.itemWords}
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator
              >
                <Animated.View
                  style={[
                    styles.card,
                    { transform: [{ perspective: 1200 }, { rotateY }] },
                  ]}
                >
                  <CardContent isFlipped={isFlipped} {...props} />
                  {!!currentItem?.description && isFlipped && (
                    <Text style={styles.description}>
                      {currentItem?.description}
                    </Text>
                  )}
                </Animated.View>
              </ScrollView>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Button
                style={styles.btn}
                classes={{ textBtn: styles.btnText }}
                onPress={flipCard}
              >
                Проверить
              </Button>
            </View>
          </Animated.View>
        </View>
      </View>
    </GestureDetector>
  )
}

export default memo(SlideItem)
