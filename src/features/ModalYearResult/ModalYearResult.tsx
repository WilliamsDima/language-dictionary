import React, { type FC, memo, useCallback, useMemo, useRef, useState } from 'react'
import { styles } from './ModalYearResult.styles'
import {
  Animated,
  FlatList,
  ListRenderItem,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useGetAppConfigQuery } from '@/shared/API/services/appConfig/AppConfigQuery'
import { useGetYearStatsQuery } from '@/shared/API/services/metrics/MetricsQuery'
import { useMeProfile } from '@/shared/hooks/useMeProfile'
import YearResultSlide from './UI/YearResultSlide/YearResultSlide'
import { height } from '@/shared/helpers/ScaleUtils'
import type { YearInReviewSlideConfig } from '@/shared/API/services/appConfig/types'

const ModalYearResult: FC = () => {
  const flatList = useRef<FlatList>(null)
  const scrollY = useRef(new Animated.Value(0)).current

  const { isWatchSplash, isAuth, showYearResult, appLanguage } = useAppSelector(
    (store) => store.app
  )

  const [currentSlide, setCurrentSlide] = useState<number>(0)

  // публичный конфиг — без исключения (нужен и до открытия модалки, для
  // гейтинга кнопки на профиле), статистика года — только когда модалка
  // реально должна открыться, чтобы не дёргать /stats/year на каждый фокус
  const { data: appConfig } = useGetAppConfigQuery(undefined, { skip: !isAuth })
  const { data: yearStats } = useGetYearStatsQuery(undefined, {
    skip: !isAuth || !showYearResult,
  })
  const { data: profile } = useMeProfile()

  const locale = appLanguage?.code ?? 'ru'

  const slides = useMemo<YearInReviewSlideConfig[]>(() => {
    const configured = appConfig?.year_in_review?.slides ?? []

    return configured
      .filter((slide) => slide.enabled)
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
  }, [appConfig?.year_in_review?.slides])

  const isVisible = useMemo(() => {
    return isWatchSplash && isAuth && showYearResult && slides.length > 0
  }, [isWatchSplash, isAuth, showYearResult, slides.length])

  const updateCurrentSlideIndex = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset = e.nativeEvent.contentOffset.y
      const currentIndex = Math.round(offset / height)
      setCurrentSlide(currentIndex)
    },
    []
  )

  const keyExtractor = useCallback(
    (item: YearInReviewSlideConfig) => item.id,
    []
  )

  const renderItem: ListRenderItem<YearInReviewSlideConfig> = useCallback(
    ({ item, index }) => (
      <YearResultSlide
        index={index}
        currentSlide={currentSlide}
        config={item}
        stats={yearStats}
        locale={locale}
        avatarUri={profile?.image}
      />
    ),
    [currentSlide, yearStats, locale, profile?.image]
  )

  return (
    <Modal
      visible={isVisible}
      transparent
      statusBarTranslucent
      style={styles.modal}
    >
      <View style={styles.content}>
        <FlatList
          onMomentumScrollEnd={updateCurrentSlideIndex}
          ref={flatList}
          data={slides}
          keyExtractor={keyExtractor}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          renderItem={renderItem}
          pagingEnabled
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
        />
      </View>
    </Modal>
  )
}

export default memo(ModalYearResult)
