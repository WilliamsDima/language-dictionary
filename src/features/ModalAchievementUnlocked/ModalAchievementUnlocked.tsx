import React, { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Modal, View } from 'react-native'
import LottieView from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import ScreenBackground from '@/shared/UI/Layout/ScreenBackground'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useAchievements } from '@/shared/hooks/useAchievements'
import { useMarkAchievementsSeenMutation } from '@/shared/API/services/achievements/AchievementsQuery'
import { useGetAppConfigQuery } from '@/shared/API/services/appConfig/AppConfigQuery'
import type { AppConfigDTO } from '@/shared/API/services/appConfig/types'
import { getUnseenAchievements } from '@/shared/helpers/getUnseenAchievements'
import { styles } from './ModalAchievementUnlocked.styles'
import { useTranslation } from '@/shared/i18n/types'
import {
  translateAchievementDescription,
  translateAchievementTitle,
} from '@/shared/helpers/achievementText'

type Props = {}

// та же задержка перед фейерверком, что и в ModalDailyStreakSuccess — даём
// модалке проявиться, прежде чем запускать анимацию
const CELEBRATION_DELAY_MS = 450

const TRANSPARENT_GRADIENT: [string, string] = ['transparent', 'transparent']

const EMPTY_IDS: ReadonlySet<number> = new Set<number>()

const GRADIENT_START = { x: 0, y: 0 }
const GRADIENT_END = { x: 1, y: 1 }

// то же условие наличия слайдов, что и в ModalYearResult: флаг showYearResult
// может быть взведён, а сама модалка итогов года не показана (нет слайдов)
const selectHasYearResultSlides = ({ data }: { data?: AppConfigDTO }) => ({
  hasYearResultSlides: !!data?.year_in_review?.slides?.some(
    (slide) => slide.enabled
  ),
})

// глобальная модалка успеха разблокировки достижения. Разблокировка
// (unlocked/unlocked_at) вычисляется и персистится бэкендом "на чтение"
// (GET /achievements), а признак "модалку уже показали" (seen) хранится на
// сервере. Поэтому показываем всё, что unlocked && !seen — в том числе на
// самом первом снимке после запуска (например, если админ открыл достижение,
// пока приложение было закрыто). По кнопке "Отлично" подтверждаем показ
// через POST /achievements/seen. Компонент всегда смонтирован в корне
// навигации (см. AppRoutes) и держит постоянную подписку на запрос
const ModalAchievementUnlocked: FC<Props> = () => {
  const {
    isAuth,
    isWatchSplash,
    showDailyStreakSuccessModal,
    showYearResult,
  } = useAppSelector((store) => store.app)

  // id, уже показанные (закрытые) в текущей сессии — не крутим их повторно,
  // даже если сервер ещё не подтвердил seen или запрос упал
  const [shownIds, setShownIds] = useState<ReadonlySet<number>>(EMPTY_IDS)

  const [markAchievementsSeen] = useMarkAchievementsSeenMutation()
  const { hasYearResultSlides } = useGetAppConfigQuery(undefined, {
    skip: !isAuth,
    selectFromResult: selectHasYearResultSlides,
  })

  const { data } = useAchievements()
  const { t } = useTranslation()

  const fireworkRef = useRef<LottieView>(null)

  // показываем разблокировки по одной, даже если пересеклось сразу
  // несколько порогов за одно действие
  const queue = useMemo(
    () => getUnseenAchievements(data, shownIds),
    [data, shownIds]
  )

  const current = useMemo(() => queue[0], [queue])

  const currentId = useMemo(() => current?.id, [current])

  // не перекрываем другие глобальные модалки — покажемся после их закрытия
  const isOtherModalVisible = useMemo(
    () =>
      showDailyStreakSuccessModal || (showYearResult && hasYearResultSlides),
    [showDailyStreakSuccessModal, showYearResult, hasYearResultSlides]
  )

  // isWatchSplash — не показываемся поверх сплэш-экрана при запуске
  const isVisible = useMemo(
    () => isAuth && isWatchSplash && !isOtherModalVisible && !!current,
    [isAuth, isWatchSplash, isOtherModalVisible, current]
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

  const onDismiss = useCallback(() => {
    if (currentId === undefined) return

    setShownIds((prev) => new Set(prev).add(currentId))
    // ошибка обрабатывается мягко в onQueryStarted мутации: в рамках сессии
    // достижение не вернётся (shownIds), при следующем запуске — покажется
    markAchievementsSeen([currentId])
  }, [currentId, markAchievementsSeen])

  // логаут/смена аккаунта: кэш сбрасывает resetApiState в useAuth, а
  // локальное состояние сессии — здесь
  useEffect(() => {
    if (!isAuth) {
      setShownIds(EMPTY_IDS)
    }
  }, [isAuth])

  // фейерверк — для каждого достижения в очереди (currentId меняется при
  // открытой модалке), а также при повторном показе после другой модалки
  useEffect(() => {
    if (!isVisible || currentId === undefined) return

    fireworkRef.current?.reset()

    const timeout = setTimeout(
      () => fireworkRef.current?.play(),
      CELEBRATION_DELAY_MS
    )

    return () => clearTimeout(timeout)
  }, [isVisible, currentId])

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

        <View pointerEvents="none" style={styles.fireworkWrapper}>
          <LottieView
            ref={fireworkRef}
            source={require('../../shared/json/firework.json')}
            loop={false}
            style={styles.firework}
          />
        </View>

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
              {t('modal.modalAchievementUnlocked.title')}
            </Text>
            <Text style={styles.title}>{titleText}</Text>
            <Text style={styles.description}>{descriptionText}</Text>
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

export default memo(ModalAchievementUnlocked)
