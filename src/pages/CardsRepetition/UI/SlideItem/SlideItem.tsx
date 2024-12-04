import React, { FC } from 'react'
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

type Props = {
  item: CardSlideType
  index: number
}

const SlideItem: FC<Props> = ({ item, index }) => {
  const { scrollX, nextSlide, swipeSlide } = useCardsContext()

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.1, 1, 0.1],
    extrapolate: 'clamp',
  })

  return (
    <PanGestureHandler onHandlerStateChange={swipeSlide}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.itemWrapper}
          onPress={nextSlide}
        >
          <Animated.View style={[styles.item, { opacity }]}>
            <TouchableOpacity activeOpacity={1} style={styles.press}>
              <ScrollView
                style={styles.itemWords}
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator
              >
                {item.item.items.map((it, i) => {
                  return (
                    <View style={styles.itemWordWrapper} key={it.id}>
                      {item.item.items.length > 1 && (
                        <Text style={styles.text}>{i + 1}:</Text>
                      )}

                      <View style={styles.itemWord}>
                        <Text style={styles.text}>{it.word}</Text>
                        <Text style={styles.text2}>{it.translate}</Text>
                      </View>
                    </View>
                  )
                })}
              </ScrollView>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </PanGestureHandler>
  )
}

export default SlideItem
