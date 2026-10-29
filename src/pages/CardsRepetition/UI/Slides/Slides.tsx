import React, { FC, useCallback } from 'react'
import { Animated, FlatList, View } from 'react-native'
import type { ListRenderItem } from 'react-native'
import SlideItem from '../SlideItem/SlideItem'
import DailySummary from '../DailySummary/DailySummary'
import { styles } from './Slides.styles'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useCardsRepetition } from '../../CardsContext'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import EditIcon from '@/assets/icons/UI/edit-green-64.svg'
import { useActions } from '@/shared/hooks/useActions'
import ModalAddItem from '@/features/ModalAddItem/ModalAddItem'
import LottieView from 'lottie-react-native'
import type { CardSlideType } from '../../CardsContext'
import { useTranslation } from '@/shared/i18n/types'

type Props = {}

// слайды задания дня (свободная практика — вкладка «Практика»)
const Slides: FC<Props> = ({}) => {
  const { setItemEdit, setShowAddModal } = useActions()
  const {
    data,
    flatList,
    scrollX,
    currentSlideData,
    currentSlide,
    count,
    isDailyFinished,
    updateCurrentSlideIndex,
  } = useCardsRepetition()

  const { t } = useTranslation()

  const editItem = () => {
    if (currentSlideData?.item) {
      setItemEdit(currentSlideData?.item)
      setShowAddModal(true)
    }
  }

  const renderItem: ListRenderItem<CardSlideType> = useCallback(
    ({ item, index }) => <SlideItem index={index} item={item} />,
    []
  )

  // задание дня отвечено целиком — вместо слайдов итог с кнопкой завершения
  if (isDailyFinished) {
    return <DailySummary />
  }

  return (
    <View style={styles.container}>
      <View style={styles.slidesWrapper}>
        {data.length ? (
          <View style={styles.header}>
            <Text style={styles.count}>
              {currentSlide + 1}/{count}
            </Text>
          </View>
        ) : (
          <></>
        )}

        <GestureHandlerRootView style={styles.listWrapper}>
          <FlatList
            style={styles.list}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            ref={flatList}
            data={data}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            contentContainerStyle={styles.contentContainerStyle}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
            ListEmptyComponent={
              <View style={styles.empty}>
                <LottieView
                  source={require('../../../../widgets/MainList/model/empty-list-lottie.json')}
                  style={styles.anim}
                  autoPlay
                  loop
                />

                <Text style={styles.emptyText}>
                  {t('cardsRepetition.empty_daily')}
                </Text>
              </View>
            }
          />
        </GestureHandlerRootView>

        <View style={styles.footer}>
          {data.length ? (
            <View style={styles.btns}>
              {/* статус карточки меняет бэкенд по ответам «Помню»/«Не помню»
                  — ручного переключения статуса в задании дня нет */}
              <Button isText={false} style={styles.btnGroup} onPress={editItem}>
                <EditIcon width={24} height={24} />
              </Button>
            </View>
          ) : (
            <></>
          )}

          {/* задание дня завершается только из итога (DailySummary) */}
        </View>
      </View>

      <ModalAddItem />
    </View>
  )
}

export default Slides
