import React, { type FC, memo } from 'react'
import { styles } from './YearResultBigNumberSlide.styles'
import { View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import LottieView, { type LottieViewProps } from 'lottie-react-native'
import { AnimatedCounter } from '@/shared/UI/AnimatedCounter/AnimatedCounter'

type Props = {
  title: string
  description: string
  value: number
  lottieSource: LottieViewProps['source']
  isActive: boolean
}

// "одно большое число" — самый частый шаблон каталога (тренировки, стрик,
// задания дня, повторения): заголовок/описание из app_config, число — из
// GET /stats/year, анимация счётчика запускается только на активном слайде
const YearResultBigNumberSlide: FC<Props> = ({
  title,
  description,
  value,
  lottieSource,
  isActive,
}) => {
  return (
    <View style={styles.slide}>
      <View style={styles.titles}>
        {title ? <Text style={styles.title}>{title}</Text> : <></>}

        <AnimatedCounter start={isActive} value={value} />

        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : (
          <></>
        )}
      </View>

      <View style={styles.footer}>
        <LottieView style={styles.lottie} source={lottieSource} autoPlay loop />
      </View>
    </View>
  )
}

export default memo(YearResultBigNumberSlide)
