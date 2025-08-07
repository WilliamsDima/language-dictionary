import React, {
  FC,
  useMemo,
  createContext,
  useContext,
  ReactNode,
  useState,
  useRef,
  RefObject,
  useEffect,
} from 'react'
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  FlatList,
  Animated,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NavigateStack } from '@/app/Navigation/types/paramsTypes'
import {
  HandlerStateChangeEvent,
  PanGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler'
import { IItem } from '@/entities/Item/model/item'
import { width } from '@/shared/helpers/ScaleUtils'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useCards } from '@/shared/hooks/useCards'

export type CardSlideType = {
  index: number
  item: IItem
}

type IContext = {
  data: CardSlideType[]
  flatList: RefObject<FlatList>
  currentSlide: number
  scrollX: Animated.Value
  isLoading: boolean
  currentSlideData?: CardSlideType
  count: number
  swipeSlide: (
    event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>
  ) => void
  updateCurrentSlideIndex: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
  nextSlide: () => void
  onEnd: () => void
}

const CardsContext = createContext<IContext>({} as IContext)

type CardsProviderType = {
  children: ReactNode
}

export const CardsProvider: FC<CardsProviderType> = ({ children }) => {
  const { goBack } = useNavigation<NavigateStack>()
  const flatList = useRef<FlatList>(null)
  const scrollX = useRef(new Animated.Value(0)).current

  const { filterCardsModal, items } = useAppSelector((store) => store.items)

  const {
    getMoreItemsRepetition,
    page,
    allItems,
    isLoading,
    counts,
    setLastVisible,
    setAllItems,
    getItemsRepetition,
  } = useCards()

  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [count, setCount] = useState<number>(0)
  const [data, setData] = useState<
    {
      index: number
      item: IItem
    }[]
  >([])

  const currentSlideData = useMemo(() => {
    return data.find((it, i) => i === currentSlide)
  }, [currentSlide, data])

  const onEnd = () => {
    setCurrentSlide(0)
    goBack()
  }

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

    if (nexSlideIndex !== data.length) {
      flatList.current?.scrollToOffset({ offset })
      setCurrentSlide(nexSlideIndex)
    } else {
      // долистал до конца
    }
  }

  const swipeSlide = (
    event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>
  ) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX } = event.nativeEvent

      if (translationX > 50) {
        // console.log('Свайп вправо');
        prevSlide()

        // Обработка свайпа влево
      } else if (translationX < -50) {
        // console.log('Свайп влево');
        nextSlide()
      }
    }
  }

  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offset = e.nativeEvent.contentOffset.x
    const currentIndex = Math.round(offset / width)
    setCurrentSlide(currentIndex)
  }

  useEffect(() => {
    page.current = 1
    setAllItems({})
    setLastVisible(null)
    getItemsRepetition()
  }, [])

  // пагинация убрана
  // useEffect(() => {
  //   if ((currentSlide + 1) % 9 === 0) {
  //     getMoreItemsRepetition()
  //   }
  // }, [currentSlide])

  useEffect(() => {
    if (!data?.length) {
      setData(
        Object.values(items)
          .filter((it) =>
            filterCardsModal.languages.length
              ? filterCardsModal.languages.includes(it.language.id)
              : true && filterCardsModal.status === it.status
          )
          .map((it, index) => {
            return {
              index,
              item: it,
            }
          })
          .sort(() => Math.random() - 0.5) || []
      )
    }
  }, [items, filterCardsModal, data])

  useEffect(() => {
    if (!count) {
      setCount(counts[filterCardsModal.status])
    }
  }, [counts, filterCardsModal, count])

  const value = useMemo(() => {
    return {
      data,
      flatList,
      currentSlide,
      scrollX,
      currentSlideData,
      isLoading,
      count,
      updateCurrentSlideIndex,
      nextSlide,
      swipeSlide,
      onEnd,
    }
  }, [
    data,
    flatList,
    currentSlide,
    scrollX,
    currentSlideData,
    isLoading,
    count,
    updateCurrentSlideIndex,
    nextSlide,
    swipeSlide,
    onEnd,
  ])

  return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
}

export const useCardsRepetition = () => {
  return useContext(CardsContext)
}
