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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NavigateStack } from '@/app/Navigation/types/paramsTypes'
import type { AppRouteParams } from '@/app/Navigation/params'
import { RoutesNames } from '@/app/Navigation/RoutesNames'
import { IItem } from '@/entities/Item/model/item'
import { width } from '@/shared/helpers/ScaleUtils'
import { getLocalDateString } from '@/shared/helpers/localDate'
import { shuffleArray } from '@/shared/helpers/shuffleArray'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useGetItemsQuery, cardToItem } from '@/pages/MainScreen/api/cardsServices'
import { useCompleteStreakMutation } from '@/shared/API/services/streak/StreakQuery'

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
  isDailyMode: boolean
  swipeSlide: (translationX: number) => void
  updateCurrentSlideIndex: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
  nextSlide: () => void
  onEnd: () => void
}

const CardsContext = createContext<IContext>({} as IContext)

type CardsProviderType = {
  children: ReactNode
}

type CardsRepetitionRoute = RouteProp<
  AppRouteParams,
  typeof RoutesNames.cardsRepetition
>

export const CardsProvider: FC<CardsProviderType> = ({ children }) => {
  const { goBack } = useNavigation<NavigateStack>()
  const route = useRoute<CardsRepetitionRoute>()
  const flatList = useRef<FlatList>(null)
  const scrollX = useRef(new Animated.Value(0)).current

  const { filterCardsModal } = useAppSelector((store) => store.items)
  const { isAuth } = useAppSelector((store) => store.app)

  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [data, setData] = useState<CardSlideType[]>([])

  const dailyParams = route.params?.mode === 'daily' ? route.params : undefined
  const isDailyMode = !!dailyParams

  const queryArgs = useMemo(
    () => ({
      filter: {
        status: filterCardsModal.status,
        filter: {
          languages: filterCardsModal?.languages,
        },
      },
      // практика должна работать по всему набору карточек, подходящих
      // под фильтр, а не только по первой странице
      all: true,
    }),
    [filterCardsModal.status, filterCardsModal.languages]
  )

  // в режиме задания дня карточки уже пришли параметром, отдельный запрос
  // списка карточек по фильтру для практики не нужен
  const { data: queryData, isFetching } = useGetItemsQuery(queryArgs, {
    skip: !isAuth || isDailyMode,
  })

  const [completeStreak] = useCompleteStreakMutation()

  const dailyItems = useMemo(
    () => dailyParams?.cards.map(cardToItem) ?? [],
    [dailyParams]
  )

  const liveItems = useMemo(
    () => (isDailyMode ? dailyItems : (queryData?.items ?? [])),
    [isDailyMode, dailyItems, queryData?.items]
  )

  const currentSlideData = useMemo(() => {
    return data.find((it, i) => i === currentSlide)
  }, [currentSlide, data])

  const onEnd = useCallback(() => {
    // завершение задания дня фиксируем ровно в момент, когда пользователь
    // выходит из практики — идемпотентно на бэкенде, поэтому не ждём ответ
    if (isDailyMode) {
      completeStreak(getLocalDateString())
    }

    setCurrentSlide(0)
    goBack()
  }, [completeStreak, goBack, isDailyMode])

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
  // дальше статус каждой карточки уже обновляется реактивно через liveItems.
  // в режиме задания дня порядок карточек уже случайный на бэкенде —
  // клиентский reshuffle для этого пути сознательно пропускается
  useEffect(() => {
    if (data.length) return

    if (isDailyMode) {
      if (dailyItems.length) {
        setData(dailyItems.map((it, index) => ({ index, item: it })))
      }
      return
    }

    if (queryData?.items.length) {
      const shuffledItems = shuffleArray(queryData.items)
      const limitedItems =
        filterCardsModal.limit === 'ALL'
          ? shuffledItems
          : shuffledItems.slice(0, filterCardsModal.limit)

      setData(limitedItems.map((it, index) => ({ index, item: it })))
    }
  }, [
    queryData?.items,
    data.length,
    isDailyMode,
    dailyItems,
    filterCardsModal.limit,
  ])

  const value = useMemo(() => {
    return {
      data,
      liveItems,
      flatList,
      currentSlide,
      scrollX,
      currentSlideData,
      isLoading: isDailyMode ? false : isFetching,
      count: data.length,
      isDailyMode,
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
    isDailyMode,
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
