import React, { type FC, memo, useMemo } from 'react'
import { styles } from './YearResultSlide2.styles'
import { View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import {
  getActiveDaysInYear,
  getMostActiveMonthInYear,
} from '@/shared/helpers/activities'
import LottieView from 'lottie-react-native'
import { AnimatedCounter } from '@/shared/UI/AnimatedCounter/AnimatedCounter'
import type { PropsSlideYearResult } from '../../data'

type Props = {} & PropsSlideYearResult

const YearResultSlide2: FC<Props> = ({ index, currentSlide }) => {
  const date = new Date()

  const { firebaseData } = useAppSelector((store) => store.user)

  const activeDays = useMemo(() => {
    return firebaseData
      ? getActiveDaysInYear(firebaseData, date.getFullYear())
      : 0
  }, [firebaseData])

  const bestActivityMonth = useMemo(() => {
    return firebaseData
      ? getMostActiveMonthInYear(firebaseData, date.getFullYear())
      : null
  }, [firebaseData])

  const percent = useMemo(() => {
    return ((activeDays / 365) * 100).toFixed(1)
  }, [activeDays])

  return (
    <View style={styles.slide}>
      <View style={styles.titles}>
        <View>
          <Text style={styles.title}>Активных дней</Text>
          <AnimatedCounter start={index === currentSlide} value={activeDays} />
        </View>

        <Text style={styles.title}>
          А это — почти <Text style={styles.count}>{percent}</Text> % всего
          года! <Text style={styles.emojy}>💪</Text>
        </Text>

        {!!bestActivityMonth && (
          <View>
            <Text style={styles.title}>
              Самый активный месяц {bestActivityMonth?.mostActiveMonth}
            </Text>
            <AnimatedCounter
              start={index === currentSlide}
              value={bestActivityMonth?.activeCountInMonth || 0}
            />
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <LottieView
          style={styles.lottie}
          source={require('../../../../shared/json/calendar.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  )
}

export default memo(YearResultSlide2)
