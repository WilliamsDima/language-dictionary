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
import { useTranslation } from '@/shared/i18n/types'

type Props = {} & PropsSlideYearResult

const YearResultSlide8: FC<Props> = ({ index, currentSlide }) => {
  const { t } = useTranslation()
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
          <Text style={styles.title}>{t('yearsResult.advertising_title')}</Text>
          <AnimatedCounter start={index === currentSlide} value={active || 0} />
          <Text style={styles.title}>
            {declOfNum(active || 0, [
              t('advertising_1'),
              t('advertising_2'),
              t('advertising_3'),
            ])}
          </Text>
        </View>
        <Text style={styles.title}>{t('yearsResult.advertising_text_1')}</Text>
        <Text style={styles.title}>{t('yearsResult.advertising_text_2')}</Text>
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
