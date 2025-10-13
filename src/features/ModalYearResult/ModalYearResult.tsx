import React, {
  type FC,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { styles } from './ModalYearResult.styles'
import {
  Animated,
  FlatList,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import YearResultSlide from './UI/YearResultSlide/YearResultSlide'
import { dataYearsResult } from './data'
import { height, width } from '@/shared/helpers/ScaleUtils'

type Props = {}

const ModalYearResult: FC<Props> = () => {
  const {} = useActions()

  const flatList = useRef<FlatList>(null)
  const scrollY = useRef(new Animated.Value(0)).current

  const { isWatchSplash, isAuth, showYearResult } = useAppSelector(
    (store) => store.app
  )

  const [currentSlide, setCurrentSlide] = useState<number>(0)

  const isVisible = useMemo(() => {
    return isWatchSplash && isAuth && showYearResult
  }, [isWatchSplash, isAuth, showYearResult])

  const onCancelHandler = () => {}

  const prevSlide = () => {
    const prevSlideIndex = currentSlide - 1
    const offset = prevSlideIndex * width

    if (currentSlide !== 0) {
      flatList.current?.scrollToOffset({ offset })
      setCurrentSlide(prevSlideIndex)
    }
  }

  const nextSlide = async () => {
    const nexSlideIndex = currentSlide + 1
    const offset = nexSlideIndex * width

    if (nexSlideIndex !== dataYearsResult.length) {
      flatList.current?.scrollToOffset({ offset })
      setCurrentSlide(nexSlideIndex)
    } else {
      // долистал до конца
    }
  }

  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offset = e.nativeEvent.contentOffset.y
    const currentIndex = Math.round(offset / height)
    setCurrentSlide(currentIndex)
  }

  useEffect(() => {}, [])

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
          data={dataYearsResult}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item, index }) => (
            <YearResultSlide
              index={index}
              currentSlide={currentSlide}
              item={item}
            />
          )}
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
