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
  useCallback,
} from 'react'
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  FlatList,
  Animated,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NavigateStack } from '@/app/Navigation/types/paramsTypes'
import { IItem } from '@/entities/Item/model/item'
import { width } from '@/shared/helpers/ScaleUtils'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useGetItemsQuery } from '@/pages/MainScreen/api/cardsServices'

export type CardSlideType = {
  index: number
  item: IItem
}

type IContext = {
  data: CardSlideType[]
  liveItems: IItem[]
  flatList: RefObject<FlatList | null>
  currentSlide: number
  scrollX: Animated.Value
  isLoading: boolean
  currentSlideData?: CardSlideType
  count: number
  swipeSlide: (translationX: number) => void
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

  const { filterCardsModal } = useAppSelector((store) => store.items)
  const { isAuth } = useAppSelector((store) => store.app)

  const queryArgs = useMemo(
    () => ({
      filter: {
        status: filterCardsModal.status,
        filter: {
          languages: filterCardsModal?.languages,
        },
      },
      limitCount: 10,
      page: 1,
    }),
    [filterCardsModal.status, filterCardsModal.languages]
  )

  const { data: queryData, isFetching } = useGetItemsQuery(queryArgs, {
    skip: !isAuth,
  })

  const liveItems = useMemo(() => queryData?.items ?? [], [queryData?.items])

  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [data, setData] = useState<CardSlideType[]>([])

  const currentSlideData = useMemo(() => {
    return data.find((it, i) => i === currentSlide)
  }, [currentSlide, data])

  const onEnd = useCallback(() => {
    setCurrentSlide(0)
    goBack()
  }, [goBack])

  const prevSlide = useCallback(() => {
    const prevSlideIndex = currentSlide - 1
    const offset = prevSlideIndex * width

    if (currentSlide !== 0) {
      flatList.current?.scrollToOffset({ offset })
      setCurrentSlide(prevSlideIndex)
    }
  }, [currentSlide])

  const nextSlide = useCallback(() => {
    const nexSlideIndex = currentSlide + 1
    const offset = nexSlideIndex * width

    if (nexSlideIndex !== data.length) {
      flatList.current?.scrollToOffset({ offset })
      setCurrentSlide(nexSlideIndex)
    } else {
      // долистал до конца
    }
  }, [currentSlide, data.length])

  const swipeSlide = useCallback(
    (translationX: number) => {
      if (translationX > 50) {
        prevSlide()
      } else if (translationX < -50) {
        nextSlide()
      }
    },
    [nextSlide, prevSlide]
  )

  const updateCurrentSlideIndex = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset = e.nativeEvent.contentOffset.x
      const currentIndex = Math.round(offset / width)
      setCurrentSlide(currentIndex)
    },
    []
  )

  // карточки для тренировки собираются один раз при заходе на экран,
  // дальше статус каждой карточки уже обновляется реактивно через liveItems
  useEffect(() => {
    if (!data.length && queryData?.items.length) {
      setData(
        queryData.items
          .map((it, index) => ({ index, item: it }))
          .sort(() => Math.random() - 0.5)
      )
    }
  }, [queryData?.items, data.length])

  const value = useMemo(() => {
    return {
      data,
      liveItems,
      flatList,
      currentSlide,
      scrollX,
      currentSlideData,
      isLoading: isFetching,
      count: data.length,
      updateCurrentSlideIndex,
      nextSlide,
      swipeSlide,
      onEnd,
    }
  }, [
    data,
    liveItems,
    currentSlide,
    scrollX,
    currentSlideData,
    isFetching,
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
