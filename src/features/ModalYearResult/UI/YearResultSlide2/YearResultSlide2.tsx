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
import { useTranslation } from '@/shared/i18n/types'

type Props = {} & PropsSlideYearResult

const YearResultSlide2: FC<Props> = ({ index, currentSlide }) => {
  const { t } = useTranslation()

  const date = new Date()

  const activity = useAppSelector((store) => store.user.activity)

  const activeDays = useMemo(() => {
    return getActiveDaysInYear(activity, date.getFullYear())
  }, [activity])

  const bestActivityMonth = useMemo(() => {
    return getMostActiveMonthInYear(activity, date.getFullYear())
  }, [activity])

  const percent = useMemo(() => {
    return ((activeDays / 365) * 100).toFixed(1)
  }, [activeDays])

  return (
    <View style={styles.slide}>
      <View style={styles.titles}>
        <View>
          <Text style={styles.title}>{t('yearsResult.active_days')}</Text>
          <AnimatedCounter start={index === currentSlide} value={activeDays} />
        </View>

        <Text style={styles.title}>
          {t('yearsResult.percent_1')}{' '}
          <Text style={styles.count}>{percent}</Text> %{' '}
          {t('yearsResult.percent_2')} <Text style={styles.emojy}>💪</Text>
        </Text>

        {!!bestActivityMonth && (
          <View>
            <Text style={styles.title}>
              {t('yearsResult.most_active_month')}{' '}
              {bestActivityMonth?.mostActiveMonth}
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
