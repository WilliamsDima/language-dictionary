import React, { type FC, memo, useMemo } from 'react'
import { styles } from './YearResultSlide3.styles'
import { View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import { getYearAddedCardsStats } from '@/shared/helpers/activities'
import LottieView from 'lottie-react-native'
import { AnimatedCounter } from '@/shared/UI/AnimatedCounter/AnimatedCounter'
import type { PropsSlideYearResult } from '../../data'
import { declOfNum } from '@/shared/helpers/textFormat'
import { useTranslation } from '@/shared/i18n/types'

type Props = {} & PropsSlideYearResult

const YearResultSlide3: FC<Props> = ({ index, currentSlide }) => {
  const { t } = useTranslation()
  const date = new Date()

  const { firebaseData } = useAppSelector((store) => store.user)

  const active = useMemo(() => {
    return firebaseData
      ? getYearAddedCardsStats(firebaseData, date.getFullYear())
      : null
  }, [firebaseData])

  return (
    <View style={styles.slide}>
      <View style={styles.titles}>
        <View>
          <Text style={styles.title}>
            {t('yearsResult.have_added_over_past_year')}
          </Text>
          <AnimatedCounter
            start={index === currentSlide}
            value={active?.total || 0}
          />
          <Text style={styles.title}>
            {declOfNum(active?.total || 0, [
              t('cards.card_1'),
              t('cards.card_2'),
              t('cards.card_3'),
            ])}
          </Text>
        </View>

        {!!active?.topMonth && (
          <View>
            <Text style={styles.title}>
              {t('yearsResult.most_active_month')} {active?.topMonth}
            </Text>
            <AnimatedCounter
              start={index === currentSlide}
              value={active?.topMonthValue || 0}
            />
          </View>
        )}

        <Text style={styles.subtitle}>
          {t(
            'yearsResult.each_added_example_is_a_step_towards_fluency_in_the_language'
          )}
        </Text>
      </View>

      <View style={styles.footer}>
        <LottieView
          style={styles.lottie}
          source={require('../../../../shared/json/cards.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  )
}

export default memo(YearResultSlide3)
