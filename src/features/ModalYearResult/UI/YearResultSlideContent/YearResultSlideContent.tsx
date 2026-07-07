import React, { type FC, memo } from 'react'
import type { YearInReviewSlideConfig } from '@/shared/API/services/appConfig/types'
import type { YearStatsResponse } from '@/shared/API/services/metrics/types'
import { resolveYearInReviewTranslation } from '@/shared/helpers/yearInReview'
import {
  getYearInReviewSlideLottieSource,
  getYearInReviewSlideNumberData,
  YEAR_IN_REVIEW_CHART_SLIDE_IDS,
} from '../../helpers'
import YearResultIntroSlide from '../YearResultIntroSlide/YearResultIntroSlide'
import YearResultOutroSlide from '../YearResultOutroSlide/YearResultOutroSlide'
import YearResultLanguagesSlide from '../YearResultLanguagesSlide/YearResultLanguagesSlide'
import YearResultChartSlide from '../YearResultChartSlide/YearResultChartSlide'
import YearResultBigNumberSlide from '../YearResultBigNumberSlide/YearResultBigNumberSlide'

type Props = {
  config: YearInReviewSlideConfig
  stats?: YearStatsResponse
  locale: string
  isActive: boolean
  avatarUri?: string
}

// генерик-рендерер слайда: конкретный визуальный шаблон выбирается по
// фиксированному id из каталога (intro/outro/languages/число(+график)),
// сами шаблоны ничего не знают ни про app_config, ни про YearStatsResponse
const YearResultSlideContent: FC<Props> = ({
  config,
  stats,
  locale,
  isActive,
  avatarUri,
}) => {
  const translation = resolveYearInReviewTranslation(config, locale)

  if (config.id === 'intro') {
    return (
      <YearResultIntroSlide
        title={translation.title}
        description={translation.description}
        avatarUri={avatarUri}
      />
    )
  }

  if (config.id === 'outro') {
    return (
      <YearResultOutroSlide
        title={translation.title}
        description={translation.description}
      />
    )
  }

  if (config.id === 'languages') {
    return (
      <YearResultLanguagesSlide
        title={translation.title}
        description={translation.description}
        languages={stats?.languages ?? []}
        isActive={isActive}
      />
    )
  }

  const numberData = getYearInReviewSlideNumberData(config.id, stats)
  const lottieSource = getYearInReviewSlideLottieSource(config.id)

  if (YEAR_IN_REVIEW_CHART_SLIDE_IDS.has(config.id)) {
    return (
      <YearResultChartSlide
        title={translation.title}
        description={translation.description}
        value={numberData?.value ?? 0}
        byMonth={numberData?.byMonth ?? []}
        lottieSource={lottieSource}
        locale={locale}
        isActive={isActive}
      />
    )
  }

  return (
    <YearResultBigNumberSlide
      title={translation.title}
      description={translation.description}
      value={numberData?.value ?? 0}
      lottieSource={lottieSource}
      isActive={isActive}
    />
  )
}

export default memo(YearResultSlideContent)
