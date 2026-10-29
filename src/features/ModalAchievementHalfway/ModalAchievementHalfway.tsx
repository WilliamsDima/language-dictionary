import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { LayoutChangeEvent, Modal, View } from 'react-native'
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import ScreenBackground from '@/shared/UI/Layout/ScreenBackground'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useAchievements } from '@/shared/hooks/useAchievements'
import { useGetMeQuery } from '@/shared/API/services/me/MeQuery'
import type { MeProfile } from '@/shared/API/services/me/types'
import { useGetAppConfigQuery } from '@/shared/API/services/appConfig/AppConfigQuery'
import { selectHasYearResultSlides } from '@/shared/API/services/appConfig/selectors'
import { getHalfwayAchievements } from '@/shared/helpers/getHalfwayAchievements'
import { getUnseenAchievements } from '@/shared/helpers/getUnseenAchievements'
import {
  translateAchievementDescription,
  translateAchievementTitle,
} from '@/shared/helpers/achievementText'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'
import { appStorage } from '@/shared/storage/mmkv.storage'
import { useTranslation } from '@/shared/i18n/types'
import { styles } from './ModalAchievementHalfway.styles'

type Props = {}

// пауза после закрытия другой глобальной модалки (или после сплэша), чтобы
// модалки не сменяли друг друга встык — как в ModalReminderPermission
const APPEAR_DELAY_MS = 500

// даём модалке проявиться, прежде чем заполнять полосу прогресса
const PROGRESS_DELAY_MS = 450
const PROGRESS_DURATION_MS = 1200
const PROGRESS_EASING = Easing.out(Easing.cubic)

const TRANSPARENT_GRADIENT: [string, string] = ['transparent', 'transparent']

const EMPTY_IDS: ReadonlySet<number> = new Set<number>()

const GRADIENT_START = { x: 0, y: 0 }
const GRADIENT_END = { x: 1, y: 1 }
const PROGRESS_GRADIENT_END = { x: 1, y: 0 }

type ShownState = {
  userId: number
  ids: ReadonlySet<number>
}

const selectMeId = ({ data }: { data?: MeProfile }) => ({ meId: data?.id })

const getStorageKey = (userId: number) =>
  `${LOCAL_KEYS.achievementHalfwayShown}:${userId}`

// null — для этого пользователя на устройстве ещё ничего не сохранено
const readShownIds = (userId: number): number[] | null => {
  const value = appStorage.getObject<unknown>(getStorageKey(userId))

  return Array.isArray(value)
    ? value.filter((id): id is number => typeof id === 'number')
    : null
}

const saveShownIds = (userId: number, ids: ReadonlySet<number>) => {
  appStorage.setObject(getStorageKey(userId), Array.from(ids))
}

// глобальная модалка «Половина пути»: один раз на достижение показывает,
// что пользователь набрал ≥ 50% прогресса, и анимированно заполняет полосу
// до текущего значения. Прогресс считает бэкенд (GET /achievements), а
// признак «уже показали» хранится локально в MMKV по ключу
// `achievementHalfwayShown:<id пользователя>` — список id достижений.
// Показ помечается сразу при появлении модалки, поэтому каждое уведомление
// показывается не больше одного раза. При первом снимке для пользователя на
// устройстве (выход фичи, переустановка, новый телефон) все достижения, уже
// перевалившие за 50%, помечаются показанными молча — без лавины модалок.
// За сессию показываем не больше одного уведомления, остальные — при
// следующих запусках. Уступает модалке разблокировки, заданию дня, модалке
// и тосту заморозок серии, итогам года и шторке напоминаний: прячется, пока
// они видны, и появляется после
const ModalAchievementHalfway: FC<Props> = () => {
  const {
    isAuth,
    isWatchSplash,
    showDailyStreakSuccessModal,
    showYearResult,
    showReminderPermissionModal,
    streakFrozen,
    isStreakFreezeToastActive,
  } = useAppSelector((store) => store.app)

  const [shown, setShown] = useState<ShownState | null>(null)
  // достижение, уведомление о котором сейчас на экране (уже помечено
  // показанным, поэтому из очереди оно пропадает — держим его здесь)
  const [displayedId, setDisplayedId] = useState<number | null>(null)
  const [hasShownInSession, setHasShownInSession] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const { meId } = useGetMeQuery(undefined, {
    skip: !isAuth,
    selectFromResult: selectMeId,
  })
  const { hasYearResultSlides } = useGetAppConfigQuery(undefined, {
    skip: !isAuth,
    selectFromResult: selectHasYearResultSlides,
  })

  const { data } = useAchievements()
  const { t } = useTranslation()

  const progress = useSharedValue(0)
  // ширина дорожки в px — заливка сдвигается по ней через translateX
  const trackWidth = useSharedValue(0)

  // пока не загружены сохранённые id текущего пользователя — очередь пуста
  const shownIds = useMemo(
    () => (shown && shown.userId === meId ? shown.ids : null),
    [shown, meId]
  )

  const displayed = useMemo(
    () =>
      displayedId === null
        ? undefined
        : data?.find((item) => item.id === displayedId && !item.unlocked),
    [data, displayedId]
  )

  const queue = useMemo(
    () => (shownIds ? getHalfwayAchievements(data, shownIds) : []),
    [data, shownIds]
  )

  const current = useMemo(
    () => displayed ?? (hasShownInSession ? undefined : queue[0]),
    [displayed, hasShownInSession, queue]
  )

  const currentId = useMemo(() => current?.id, [current])

  // модалка разблокировки показывает unlocked && !seen — пока такие есть,
  // она важнее; уведомление «Половина пути» подождёт
  const hasUnseenUnlocked = useMemo(
    () => getUnseenAchievements(data, EMPTY_IDS).length > 0,
    [data]
  )

  const isOtherModalVisible = useMemo(
    () =>
      hasUnseenUnlocked ||
      showDailyStreakSuccessModal ||
      !!streakFrozen ||
      isStreakFreezeToastActive ||
      showReminderPermissionModal ||
      (showYearResult && hasYearResultSlides),
    [
      hasUnseenUnlocked,
      showDailyStreakSuccessModal,
      streakFrozen,
      isStreakFreezeToastActive,
      showReminderPermissionModal,
      showYearResult,
      hasYearResultSlides,
    ]
  )

  const canShow = useMemo(
    () => isAuth && isWatchSplash && !isOtherModalVisible && !!current,
    [isAuth, isWatchSplash, isOtherModalVisible, current]
  )

  const isVisible = useMemo(() => canShow && isReady, [canShow, isReady])

  const percent = useMemo(
    () => (current ? Math.min(Math.max(current.progress_percent, 0), 100) : 0),
    [current]
  )

  const gradientColors = useMemo((): [string, string] => {
    return current ? [current.color_from, current.color_to] : TRANSPARENT_GRADIENT
  }, [current])

  const titleText = useMemo(
    () => (current ? translateAchievementTitle(t, current.title) : ''),
    [t, current]
  )

  const descriptionText = useMemo(
    () =>
      current
        ? translateAchievementDescription(
            t,
            current.description,
            current.threshold
          )
        : '',
    [t, current]
  )

  const progressText = useMemo(
    () =>
      current
        ? t('modal.modalAchievementHalfway.progress', {
            current: current.progress_current,
            total: current.threshold,
          })
        : '',
    [t, current]
  )

  const remainingText = useMemo(
    () =>
      current
        ? t('modal.modalAchievementHalfway.remaining', {
            value: Math.max(current.threshold - current.progress_current, 0),
          })
        : '',
    [t, current]
  )

  // заливка во всю ширину дорожки, уезжающая влево на непройденную часть:
  // анимируем transform, а не layout-свойство width — анимированный width
  // в процентах не применялся, и полоса оставалась пустой. Пока дорожка не
  // измерена, заливку прячем, чтобы не мигнула полной
  const fillAnimatedStyle = useAnimatedStyle(() => ({
    opacity: trackWidth.value > 0 ? 1 : 0,
    transform: [{ translateX: (progress.value - 1) * trackWidth.value }],
  }))

  const progressFillStyle = useMemo(
    () => [styles.progressFill, fillAnimatedStyle],
    [fillAnimatedStyle]
  )

  const onTrackLayout = useCallback(
    (event: LayoutChangeEvent) => {
      trackWidth.value = event.nativeEvent.layout.width
    },
    [trackWidth]
  )

  const onDismiss = useCallback(() => {
    setDisplayedId(null)
    setIsReady(false)
  }, [])

  // логаут/смена аккаунта — сбрасываем состояние сессии
  useEffect(() => {
    if (!isAuth) {
      setShown(null)
      setDisplayedId(null)
      setHasShownInSession(false)
      setIsReady(false)
    }
  }, [isAuth])

  // загрузка сохранённых id; первый снимок для пользователя на устройстве —
  // молча помечаем все достижения, уже перевалившие за 50%
  useEffect(() => {
    if (meId === undefined || !data || shownIds) return

    const stored = readShownIds(meId)

    if (stored) {
      setShown({ userId: meId, ids: new Set(stored) })
      return
    }

    const baseline = new Set(
      getHalfwayAchievements(data, EMPTY_IDS).map((item) => item.id)
    )
    saveShownIds(meId, baseline)
    setShown({ userId: meId, ids: baseline })
  }, [meId, data, shownIds])

  // пауза перед появлением — и после сплэша, и после закрытия другой модалки
  useEffect(() => {
    if (!canShow) {
      setIsReady(false)
      return
    }

    const timeout = setTimeout(() => setIsReady(true), APPEAR_DELAY_MS)

    return () => clearTimeout(timeout)
  }, [canShow, currentId])

  // модалка появилась — сразу помечаем показ (не больше одного раза)
  useEffect(() => {
    if (!isVisible || currentId === undefined || currentId === displayedId) {
      return
    }
    if (meId === undefined || !shownIds) return

    const nextIds = new Set(shownIds).add(currentId)
    saveShownIds(meId, nextIds)
    setShown({ userId: meId, ids: nextIds })
    setDisplayedId(currentId)
    setHasShownInSession(true)
  }, [isVisible, currentId, displayedId, meId, shownIds])

  // заполнение полосы от нуля до текущего прогресса при каждом показе
  useEffect(() => {
    if (!isVisible || currentId === undefined) return

    cancelAnimation(progress)
    progress.value = 0
    progress.value = withDelay(
      PROGRESS_DELAY_MS,
      withTiming(percent / 100, {
        duration: PROGRESS_DURATION_MS,
        easing: PROGRESS_EASING,
      })
    )

    return () => cancelAnimation(progress)
  }, [isVisible, currentId, percent, progress])

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
      style={styles.modal}
    >
      <View style={styles.content}>
        <ScreenBackground />

        {current ? (
          <>
            <LinearGradient
              colors={gradientColors}
              start={GRADIENT_START}
              end={GRADIENT_END}
              style={styles.badge}
            >
              <Text style={styles.icon}>{current.icon}</Text>
            </LinearGradient>

            <Text style={styles.eyebrow}>
              {t('modal.modalAchievementHalfway.title')}
            </Text>
            <Text style={styles.title}>{titleText}</Text>
            <Text style={styles.description}>{descriptionText}</Text>

            <View style={styles.progressBlock}>
              <View style={styles.progressTrack} onLayout={onTrackLayout}>
                <Animated.View style={progressFillStyle}>
                  <LinearGradient
                    colors={gradientColors}
                    start={GRADIENT_START}
                    end={PROGRESS_GRADIENT_END}
                    style={styles.progressGradient}
                  />
                </Animated.View>
              </View>

              <View style={styles.progressRow}>
                <Text style={styles.progressText}>{progressText}</Text>
                <Text style={styles.remainingText}>{remainingText}</Text>
              </View>
            </View>
          </>
        ) : (
          <></>
        )}

        <Button type="PRIMERY" style={styles.btn} onPress={onDismiss}>
          {t('ui.great')}
        </Button>
      </View>
    </Modal>
  )
}

export default memo(ModalAchievementHalfway)
