import React, { type FC, memo } from 'react'
import { styles } from './YearResultSlide.styles'
import { View } from 'react-native'
import { type DataYearsResultType, SLIDE_GRADIENTS } from '../../data'
import LinearGradient from 'react-native-linear-gradient'

type Props = {
  item: DataYearsResultType
  index: number
  currentSlide: number
}

const YearResultSlide: FC<Props> = ({ item, index, currentSlide }) => {
  return (
    <View style={styles.slide}>
      <LinearGradient
        colors={SLIDE_GRADIENTS[index].colors}
        start={SLIDE_GRADIENTS[index].start}
        end={SLIDE_GRADIENTS[index].end}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        {item.slide({ index, currentSlide, item })}
      </LinearGradient>
    </View>
  )
}

export default memo(YearResultSlide)
