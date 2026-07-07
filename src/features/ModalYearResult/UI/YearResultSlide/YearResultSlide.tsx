import React, { type FC, memo } from 'react'
import { styles } from './YearResultSlide.styles'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SLIDE_GRADIENTS } from '../../data'
import YearResultSlideContent from '../YearResultSlideContent/YearResultSlideContent'
import type { YearInReviewSlideConfig } from '@/shared/API/services/appConfig/types'
import type { YearStatsResponse } from '@/shared/API/services/metrics/types'

type Props = {
  config: YearInReviewSlideConfig
  stats?: YearStatsResponse
  locale: string
  index: number
  currentSlide: number
  avatarUri?: string
}

const YearResultSlide: FC<Props> = ({
  config,
  stats,
  locale,
  index,
  currentSlide,
  avatarUri,
}) => {
  const gradient = SLIDE_GRADIENTS[index % SLIDE_GRADIENTS.length]

  return (
    <View style={styles.slide}>
      <LinearGradient
        colors={gradient.colors}
        start={gradient.start}
        end={gradient.end}
        style={styles.gradient}
      >
        <YearResultSlideContent
          config={config}
          stats={stats}
          locale={locale}
          isActive={index === currentSlide}
          avatarUri={avatarUri}
        />
      </LinearGradient>
    </View>
  )
}

export default memo(YearResultSlide)
