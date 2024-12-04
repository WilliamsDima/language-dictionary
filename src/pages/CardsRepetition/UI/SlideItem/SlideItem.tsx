import React, { FC, useRef, useState } from 'react'
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { styles } from './SlideItem.styles'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { CardSlideType, useCardsContext } from '../../CardsContext'
import { width } from '@/shared/helpers/ScaleUtils'
import Button from '@/shared/UI/Button/Button'

type Props = {
  item: CardSlideType
  index: number
}

const CardContent: FC<Props> = ({ item }) => {
  return item.item.items.map((it, i) => {
    return (
      <View style={styles.itemWordWrapper} key={it.id}>
        <View
          style={[
            styles.itemWord,
            item.item.items.length > 1 && styles.itemWordBorder,
          ]}
        >
          <Text style={styles.text}>{it.translate}</Text>
        </View>
      </View>
    )
  })
}

const SlideItem: FC<Props> = (props) => {
  const { item, index } = props
  const { scrollX, nextSlide, swipeSlide } = useCardsContext()

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.1, 1, 0.1],
    extrapolate: 'clamp',
  })

  const [isFlipped, setIsFlipped] = useState(false)
  const flipAnimation = useRef(new Animated.Value(0)).current

  // Интерполяция угла поворота
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  })

  // Обратная сторона невидима, если её угол меньше 90°
  const frontOpacity = flipAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 0],
  })

  const backOpacity = flipAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  })

  const flipCard = () => {
    Animated.timing(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => setIsFlipped(!isFlipped))
  }

  return (
    <PanGestureHandler onHandlerStateChange={swipeSlide}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.itemWrapper}
          onPress={nextSlide}
        >
          <Animated.View style={[styles.item, { opacity }]}>
            <TouchableOpacity
              onPress={nextSlide}
              activeOpacity={1}
              style={styles.press}
            >
              <ScrollView
                style={styles.itemWords}
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator
              >
                {/* Передняя сторона */}
                <Animated.View
                  style={[
                    styles.card,
                    { transform: [{ rotateY: frontInterpolate }] },
                    { opacity: frontOpacity },
                  ]}
                >
                  <CardContent {...props} />
                </Animated.View>

                {/* Задняя сторона */}
                <Animated.View
                  style={[
                    styles.card,
                    styles.cardBack,
                    { transform: [{ rotateY: backInterpolate }] },
                    { opacity: backOpacity },
                  ]}
                >
                  <CardContent {...props} />
                </Animated.View>
              </ScrollView>

              <View style={styles.footer}>
                {!!item.item.description && isFlipped && (
                  <Text style={styles.description}>
                    {item.item.description}
                  </Text>
                )}

                <Button onPress={flipCard}>Проверить</Button>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </PanGestureHandler>
  )
}

export default SlideItem