import React, { type FC, memo, useMemo } from 'react'
import { styles } from './YearResultSlide8.styles'
import { View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import { getYearTotaltViewedAds } from '@/shared/helpers/activities'
import LottieView from 'lottie-react-native'
import { AnimatedCounter } from '@/shared/UI/AnimatedCounter/AnimatedCounter'
import type { PropsSlideYearResult } from '../../data'
import { declOfNum } from '@/shared/helpers/textFormat'

type Props = {} & PropsSlideYearResult

const YearResultSlide8: FC<Props> = ({ index, currentSlide }) => {
  const date = new Date()

  const { firebaseData } = useAppSelector((store) => store.user)

  const active = useMemo(() => {
    return firebaseData
      ? getYearTotaltViewedAds(firebaseData, date.getFullYear())
      : null
  }, [firebaseData])

  return (
    <View style={styles.slide}>
      <View style={styles.titles}>
        <View>
          <Text style={styles.title}>📺 За этот год ты посмотрел</Text>
          <AnimatedCounter start={index === currentSlide} value={active || 0} />
          <Text style={styles.title}>
            {declOfNum(active || 0, ['рекламу', 'рекламы', 'реклам'])}
          </Text>
        </View>
        <Text style={styles.title}>
          Спасибо — это помогает нам развивать приложение 💚
        </Text>
        <Text style={styles.title}>
          Ты герой, переживший все эти секунды 😅
        </Text>
      </View>

      <View style={styles.footer}>
        <LottieView
          style={styles.lottie}
          source={require('../../../../shared/json/money.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  )
}

export default memo(YearResultSlide8)
