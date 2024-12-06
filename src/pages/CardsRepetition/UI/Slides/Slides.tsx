import React, { FC, useMemo } from 'react'
import { ActivityIndicator, Animated, FlatList, View } from 'react-native'
import SlideItem from '../SlideItem/SlideItem'
import { styles } from './Slides.styles'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useCardsContext } from '../../CardsContext'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import EditIcon from '@/assets/icons/UI/edit-green-64.svg'
import DoneIcon from '@/assets/icons/UI/done-primery-64.svg'
import RepeatIcon from '@/assets/icons/UI/repeat-64-orange.svg'
import { useUpdateItemMutation } from '@/pages/SettingsScreen/api/userServices'
import { useAppSelector } from '@/shared/hooks/useStore'
import { COLORS } from '@/assets/styles/colors'
import { useActions } from '@/shared/hooks/useActions'
import ModalAddItem from '@/features/ModalAddItem/ModalAddItem'

type Props = {}

const Slides: FC<Props> = ({}) => {
  const { setItemEdit, setShowAddModal } = useActions()
  const {
    data,
    flatList,
    scrollX,
    currentSlideData,
    currentSlide,
    onEnd,
    updateCurrentSlideIndex,
  } = useCardsContext()

  const { firebaseData } = useAppSelector((store) => store.user)

  const [updateItem, { isLoading: isLoadingUpdate }] = useUpdateItemMutation()

  const editItem = () => {
    if (currentSlideData?.item) {
      setItemEdit(currentSlideData?.item)
      setShowAddModal(true)
    }
  }

  const changeStatus = () => {
    if (firebaseData && currentSlideData?.item.idDoc) {
      if (currentSlideData.item.status === 'READY') {
        updateItem({
          uid: firebaseData.uid,
          idDoc: currentSlideData.item.idDoc,
          updatedData: { ...currentSlideData.item, status: 'STUDY' },
        })
      } else {
        updateItem({
          uid: firebaseData.uid,
          idDoc: currentSlideData.item.idDoc,
          updatedData: { ...currentSlideData.item, status: 'READY' },
        })
      }
    }
  }

  const currentStatusSlide = useMemo(() => {
    return currentSlideData?.item.status
  }, [currentSlideData])

  return (
    <View style={styles.container}>
      <View style={styles.slidesWrapper}>
        <View style={styles.header}>
          <Text style={styles.count}>
            {currentSlide + 1}/{data.length}
          </Text>
        </View>

        <GestureHandlerRootView>
          <FlatList
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
          />
        </GestureHandlerRootView>

        <View style={styles.footer}>
          <View style={styles.btns}>
            {/* учить или на повторение сделать ввиде иконки */}
            <Button
              isText={false}
              style={styles.btnGroup}
              onPress={changeStatus}
            >
              {isLoadingUpdate ? (
                <ActivityIndicator size={'small'} color={COLORS.primery} />
              ) : (
                <>
                  {currentStatusSlide === 'STUDY' ? (
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
