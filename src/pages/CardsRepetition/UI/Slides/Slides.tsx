import React, { FC, startTransition, useActionState, useCallback, useMemo, useOptimistic } from 'react'
import { useUnistyles } from 'react-native-unistyles'
import { ActivityIndicator, Animated, FlatList, View } from 'react-native'
import SlideItem from '../SlideItem/SlideItem'
import { styles } from './Slides.styles'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useCardsRepetition } from '../../CardsContext'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import EditIcon from '@/assets/icons/UI/edit-green-64.svg'
import DoneIcon from '@/assets/icons/UI/done-primery-64.svg'
import RepeatIcon from '@/assets/icons/UI/repeat-64-orange.svg'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import ModalAddItem from '@/features/ModalAddItem/ModalAddItem'
import LottieView from 'lottie-react-native'
import { useCards } from '@/shared/hooks/useCards'
import { useUserActivity } from '@/shared/hooks/useUserActivity'
import type { IItem } from '@/entities/Item/model/item'

type Props = {}

const Slides: FC<Props> = ({}) => {
  const { theme } = useUnistyles()
  const { setItemEdit, setShowAddModal } = useActions()
  const {
    data,
    liveItems,
    flatList,
    scrollX,
    currentSlideData,
    currentSlide,
    count,
    onEnd,
    nextSlide,
    updateCurrentSlideIndex,
  } = useCardsRepetition()

  const { isAuth } = useAppSelector((store) => store.app)

  const { updateStatusHandler } = useCards()
  const { updateActivity } = useUserActivity()

  const [optimisticLiveItems, updateOptimisticStatus] = useOptimistic(
    liveItems,
    (current: IItem[], update: { id: number; status: 'READY' | 'STUDY' }) =>
      current.map((it) =>
        it.id === update.id ? { ...it, status: update.status } : it
      ),
  )

  const editItem = () => {
    if (currentSlideData?.item) {
      setItemEdit(currentSlideData?.item)
      setShowAddModal(true)
    }
  }

  const currentItem = useMemo(() => {
    return (
      currentSlideData &&
      optimisticLiveItems.find((it) => it.id === currentSlideData.item.id)
    )
  }, [currentSlideData, optimisticLiveItems])

  const [, changeStatusAction, isLoading] = useActionState(
    async (_prevState: null) => {
      if (!isAuth || !currentSlideData?.item.idDoc || !currentItem) return null

      const nextStatus = currentItem.status === 'READY' ? 'STUDY' : 'READY'
      updateOptimisticStatus({ id: currentItem.id, status: nextStatus })

      await updateStatusHandler(currentItem, nextStatus)

      if (nextStatus === 'READY') {
        updateActivity({ studiedCard: true })
      } else {
        updateActivity({ repeatCard: true })
      }

      nextSlide()
      return null
    },
    null,
  )

  const handleChangeStatus = useCallback(() => {
    startTransition(changeStatusAction)
  }, [changeStatusAction])

  return (
    <View style={styles.container}>
      <View style={styles.slidesWrapper}>
        {!!data.length ? (
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
            renderItem={({ item, index }) => (
              <SlideItem index={index} item={item} />
            )}
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
                  Ничего не найдено по выбранному фильтру
                </Text>
              </View>
            }
          />
        </GestureHandlerRootView>

        <View style={styles.footer}>
          {!!data.length && (
            <View style={styles.btns}>
              {/* учить или на повторение сделать ввиде иконки */}
              <Button
                isText={false}
                style={styles.btnGroup}
                onPress={handleChangeStatus}
              >
                {isLoading ? (
                  <ActivityIndicator
                    size={'small'}
                    color={theme.colors.palette.primery}
                  />
                ) : (
                  <>
                    {currentItem?.status === 'STUDY' ? (
                      <DoneIcon width={24} height={24} />
                    ) : (
                      <RepeatIcon width={24} height={24} />
                    )}
                  </>
                )}
              </Button>

              <Button isText={false} style={styles.btnGroup} onPress={editItem}>
                <EditIcon width={24} height={24} />
              </Button>
            </View>
          )}

          <Button
            onPress={onEnd}
            style={styles.btn}
            classes={{ textBtn: styles.textBtn }}
          >
            завершить
          </Button>
        </View>
      </View>

      <ModalAddItem />
    </View>
  )
}

export default Slides
