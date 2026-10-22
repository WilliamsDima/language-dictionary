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
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useStore'
import {
  useGetItemsQuery,
  cardToItem,
  syncItemsStatusInCache,
} from '@/pages/MainScreen/api/cardsServices'
import {
  useCompleteStreakMutation,
  useSubmitDailyChallengeResultsMutation,
} from '@/shared/API/services/streak/StreakQuery'
import type { SubmitDailyChallengeResultsResponse } from '@/shared/API/services/streak/types'
import { useLogMetricEventMutation } from '@/shared/API/services/metrics/MetricsQuery'
import type { ShowVariantListVale } from '@/shared/store/slice/userSlice'
import { getDailyChallengeModeBehavior } from './dailyChallengeModes'
import {
  DailyAnswers,
  DailyAnswersStats,
  getDailyAnswersStats,
  getNextUnansweredIndex,
  toDailyChallengeResults,
} from './dailyAnswers'

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
  showVariant: ShowVariantListVale | null
  // задание дня: ответы «Помню» (true) / «Не помню» (false) по id карточки
  dailyAnswers: DailyAnswers
  dailyStats: DailyAnswersStats
  // задание дня: отвечены все карточки — вместо слайдов показывается итог
  isDailyFinished: boolean
  // задание дня: идёт отправка ответов и завершение серии (кнопка итога
  // показывает лоадер и не нажимается повторно)
  isDailyCompleting: boolean
  // задание дня: завершить серию не удалось — итог предлагает повторить
  isDailyCompleteError: boolean
  // задание дня: карточки, которые ещё ни разу не повторялись (review.is_new)
  newCardIds: Set<number>
  swipeSlide: (translationX: number) => void
  updateCurrentSlideIndex: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
  nextSlide: () => void
  answerCard: (cardId: number, correct: boolean) => void
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
  const dispatch = useAppDispatch()
  const flatList = useRef<FlatList>(null)
  const scrollX = useRef(new Animated.Value(0)).current

  const { filterCardsModal } = useAppSelector((store) => store.items)
  const { isAuth } = useAppSelector((store) => store.app)

  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [data, setData] = useState<CardSlideType[]>([])
  // ответы задания дня живут только в памяти и уходят одним запросом в
  // onEnd; если приложение закрыли посреди задания — ответы теряются
  // (осознанное решение, без офлайн-буфера)
  const [dailyAnswers, setDailyAnswers] = useState<DailyAnswers>({})
  const [isDailyFinished, setIsDailyFinished] = useState(false)
  const [isDailyCompleting, setIsDailyCompleting] = useState(false)
  const [isDailyCompleteError, setIsDailyCompleteError] = useState(false)
  // синхронная защита от двойного нажатия «Завершить» — state обновится
  // только на следующем рендере
  const isDailyCompletingRef = useRef(false)
  // ответы уже приняты бэкендом — при повторе после ошибки завершения серии
  // второй раз их не шлём
  const isDailyResultsSentRef = useRef(false)

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
  const [submitDailyResults] = useSubmitDailyChallengeResultsMutation()
  const [logMetricEvent] = useLogMetricEventMutation()

  const dailyItems = useMemo(
    () => dailyParams?.cards.map(cardToItem) ?? [],
    [dailyParams]
  )

  const newCardIds = useMemo(
    () =>
      new Set(
        (dailyParams?.cards ?? [])
          .filter((card) => card.review?.is_new)
          .map((card) => card.id)
      ),
    [dailyParams]
  )

  const liveItems = useMemo(
    () => (isDailyMode ? dailyItems : (queryData?.items ?? [])),
    [isDailyMode, dailyItems, queryData?.items]
  )

  // в задании дня направление показа задаёт бэкенд (mode ответа
  // /streak/daily-challenge); если режима нет или он незнакомый — локальная
  // настройка практики. filterCardsModal при этом не перезаписывается
  const dailyBehavior = useMemo(
    () => getDailyChallengeModeBehavior(dailyParams?.challengeMode),
    [dailyParams?.challengeMode]
  )

  const showVariant = useMemo(
    () => dailyBehavior?.showVariant ?? filterCardsModal.showVariant,
    [dailyBehavior, filterCardsModal.showVariant]
  )

  const currentSlideData = useMemo(() => {
    return data.find((it, i) => i === currentSlide)
  }, [currentSlide, data])

  const dailyStats = useMemo(
    () => getDailyAnswersStats(dailyAnswers),
    [dailyAnswers]
  )

  // бэкенд сам сменил статус части карточек (box >= 5 → READY, «Не помню»
  // у READY → STUDY) — переносим это в кэш списков карточек
  const syncDailyStatuses = useCallback(
    (response: SubmitDailyChallengeResultsResponse) => {
      const changedItems = response.results.reduce<IItem[]>((acc, result) => {
        const item = dailyItems.find((it) => it.id === result.card_id)
        return item && item.status !== result.status
          ? [...acc, { ...item, status: result.status }]
          : acc
      }, [])

      dispatch(syncItemsStatusInCache(changedItems))
    },
    [dailyItems, dispatch]
  )

  // ответы задания дня уходят до POST /streak/complete, но завершение
  // задания от их успеха не зависит: ошибка отправки ответов не блокирует
  // ни выход, ни стрик. Пустой набор не отправляется (бэкенд ответит 400).
  // Статус этих карточек меняет сам бэкенд — PUT /cards/{id}/status в
  // задании дня не вызывается. Ошибка POST /streak/complete пробрасывается
  // наружу — её показывает итог задания с возможностью повторить
  const finishDailyChallenge = useCallback(async () => {
    const date = getLocalDateString()
    const results = toDailyChallengeResults(dailyAnswers)

    if (results.length && !isDailyResultsSentRef.current) {
      try {
        const response = await submitDailyResults({ date, results }).unwrap()
        isDailyResultsSentRef.current = true
        syncDailyStatuses(response)
      } catch {
        // ответы этого захода теряются — задание всё равно засчитываем
      }
    }

    await completeStreak(date).unwrap()
  }, [completeStreak, dailyAnswers, submitDailyResults, syncDailyStatuses])

  const leaveRepetition = useCallback(() => {
    // training_opened — единственное реальное событие, которое двигает
    // метрику trainings_count на бэкенде (достижения "Постоянная практика",
    // "Мастер тренировок"); это фоновая метрика, не блокирует выход из
    // практики и сама просит перечитать достижения (invalidatesTags)
    logMetricEvent({ type: 'training_opened' })

    setCurrentSlide(0)
    goBack()
  }, [goBack, logMetricEvent])

  // свободная практика ничего не ждёт от сервера — выходим сразу. Задание
  // дня закрываем только после ответа POST /streak/complete: пока запросы
  // идут, кнопка итога показывает лоадер, иначе пользователь видит главный
  // экран без продлённой серии, а модалка успеха всплывает через пару секунд
  const onEnd = useCallback(async () => {
    if (!isDailyMode) {
      leaveRepetition()
      return
    }

    if (isDailyCompletingRef.current) return

    isDailyCompletingRef.current = true
    setIsDailyCompleting(true)
    setIsDailyCompleteError(false)

    try {
      await finishDailyChallenge()
      leaveRepetition()
    } catch {
      setIsDailyCompleteError(true)
    } finally {
      isDailyCompletingRef.current = false
      setIsDailyCompleting(false)
    }
  }, [finishDailyChallenge, isDailyMode, leaveRepetition])

  const goToSlide = useCallback((slideIndex: number) => {
    flatList.current?.scrollToOffset({ offset: slideIndex * width })
    setCurrentSlide(slideIndex)
  }, [])

  const prevSlide = useCallback(() => {
    if (currentSlide !== 0) {
      goToSlide(currentSlide - 1)
    }
  }, [currentSlide, goToSlide])

  const nextSlide = useCallback(() => {
    const nexSlideIndex = currentSlide + 1

    if (nexSlideIndex !== data.length) {
      goToSlide(nexSlideIndex)
    } else {
      // долистал до конца
    }
  }, [currentSlide, data.length, goToSlide])

  // повторный ответ по той же карточке перезаписывает прежний; дальше —
  // следующая неотвеченная карточка, а когда отвечены все — итог задания
  const answerCard = useCallback(
    (cardId: number, correct: boolean) => {
      const nextAnswers = { ...dailyAnswers, [cardId]: correct }
      const fromIndex = data.findIndex((it) => it.item.id === cardId)
      const nextIndex = getNextUnansweredIndex(data, nextAnswers, fromIndex)

      setDailyAnswers(nextAnswers)

      if (nextIndex === -1) {
        setIsDailyFinished(true)
      } else {
        goToSlide(nextIndex)
      }
    },
    [dailyAnswers, data, goToSlide]
  )

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
      showVariant,
      dailyAnswers,
      dailyStats,
      isDailyFinished,
      isDailyCompleting,
      isDailyCompleteError,
      newCardIds,
      updateCurrentSlideIndex,
      nextSlide,
      swipeSlide,
      answerCard,
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
    showVariant,
    dailyAnswers,
    dailyStats,
    isDailyFinished,
    isDailyCompleting,
    isDailyCompleteError,
    newCardIds,
    updateCurrentSlideIndex,
    nextSlide,
    swipeSlide,
    answerCard,
    onEnd,
  ])

  return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
}

export const useCardsRepetition = () => {
  return useContext(CardsContext)
}
