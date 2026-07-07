import React, { type FC, memo, useMemo } from 'react'
import { styles } from './YearResultChartSlide.styles'
import { View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import LottieView, { type LottieViewProps } from 'lottie-react-native'
import { AnimatedCounter } from '@/shared/UI/AnimatedCounter/AnimatedCounter'

type Props = {
  title: string
  description: string
  value: number
  byMonth: number[]
  lottieSource: LottieViewProps['source']
  locale: string
  isActive: boolean
}

const MIN_BAR_HEIGHT_PERCENT = 6

// "число + мини-график по месяцам" — карточки добавлены/изучены, открытия
// приложения: те же данные, что и BigNumberSlide, плюс 12 столбиков по
// byMonth (index 0 = январь)
const YearResultChartSlide: FC<Props> = ({
  title,
  description,
  value,
  byMonth,
  lottieSource,
  locale,
  isActive,
}) => {
  const bars = useMemo(() => {
    const maxValue = Math.max(1, ...byMonth)

    return byMonth.map((monthValue, monthIndex) => {
      const label = new Intl.DateTimeFormat(locale, { month: 'short' }).format(
        new Date(2000, monthIndex, 1)
      )
      const heightPercent = Math.max(
        MIN_BAR_HEIGHT_PERCENT,
        Math.round((monthValue / maxValue) * 100)
      )

      return {
        monthIndex,
        label,
        barStyle: { height: `${heightPercent}%` as const },
      }
    })
  }, [byMonth, locale])

  return (
    <View style={styles.slide}>
      <View style={styles.titles}>
        {!!title ? <Text style={styles.title}>{title}</Text> : <></>}

        <AnimatedCounter start={isActive} value={value} />

        {!!description ? (
          <Text style={styles.description}>{description}</Text>
        ) : (
          <></>
        )}
      </View>

      <View style={styles.chart}>
        {bars.map((bar) => (
          <View key={bar.monthIndex} style={styles.barColumn}>
            <View style={styles.barTrack}>
              <View style={[styles.bar, bar.barStyle]} />
            </View>
            <Text style={styles.barLabel}>{bar.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <LottieView style={styles.lottie} source={lottieSource} autoPlay loop />
      </View>
    </View>
  )
}

export default memo(YearResultChartSlide)
