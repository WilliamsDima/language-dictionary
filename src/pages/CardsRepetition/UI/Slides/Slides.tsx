import React, { FC, useMemo, useState } from 'react'
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

  const [isLoading, setIsLoading] = useState(false)

  const { updateStatusHandler } = useCards()
  const { updateActivity } = useUserActivity()

  const editItem = () => {
    if (currentSlideData?.item) {
      setItemEdit(currentSlideData?.item)
      setShowAddModal(true)
    }
  }

  const currentItem = useMemo(() => {
    return (
      currentSlideData &&
      liveItems.find((it) => it.id === currentSlideData.item.id)
    )
  }, [currentSlideData, liveItems])

  const changeStatus = async () => {
    if (isAuth && currentSlideData?.item.idDoc && currentItem) {
      if (currentItem.status === 'READY') {
        setIsLoading(true)

        await updateStatusHandler(currentItem, 'STUDY')

        updateActivity({ repeatCard: true })

        nextSlide()

        setIsLoading(false)
      } else {
        setIsLoading(true)

        await updateStatusHandler(currentItem, 'READY')

        updateActivity({ studiedCard: true })

        nextSlide()

        setIsLoading(false)
      }
    }
  }

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
                onPress={changeStatus}
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
