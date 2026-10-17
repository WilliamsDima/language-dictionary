import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Modal, View } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import LottieView from 'lottie-react-native'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import ScreenBackground from '@/shared/UI/Layout/ScreenBackground'
import { AnimatedCounter } from '@/shared/UI/AnimatedCounter/AnimatedCounter'
import { toast } from '@/shared/UI/Toast/toast'
import { useActions } from '@/shared/hooks/useActions'
import { useAppSelector } from '@/shared/hooks/useStore'
import { styles } from './ModalDailyStreakSuccess.styles'
import { useTranslation } from '@/shared/i18n/types'

type Props = {}

// даём модалке проявиться, прежде чем запускать фейерверк и слайд цифр —
// иначе анимации почти заканчиваются, пока пользователь только успевает
// перевести взгляд на экран
const CELEBRATION_DELAY_MS = 450

// пауза после закрытия модалки «Стрик заморожен», чтобы модалки не
// сменяли друг друга встык
const AFTER_FROZEN_DELAY_MS = 500

// тост «+1 заморозка» показываем, когда эта модалка уже погасла (RN Modal
// перекрывает тост), и держим флаг, пока тост не уедет, — модалки
// достижений ждут его
const FREEZE_TOAST_DELAY_MS = 350
const FREEZE_TOAST_DURATION_MS = 3000
const FREEZE_TOAST_EXIT_MS = 300

// глобальная модалка успеха задания дня — видимость и данные анимации
// приходят из appSlice, куда их кладёт StreakQuery после completeStreak.
// Если тем же выполнением потрачены заморозки, сначала показывается
// ModalStreakFrozen, а эта модалка ждёт её закрытия
const ModalDailyStreakSuccess: FC<Props> = () => {
  const { theme } = useUnistyles()
  const { setShowDailyStreakSuccessModal, setIsStreakFreezeToastActive } =
    useActions()
  const {
    showDailyStreakSuccessModal,
    dailyStreakAnimation,
    dailyStreakFreeze,
    streakFrozen,
    isStreakFreezeToastActive,
  } = useAppSelector((store) => store.app)

  const [isReady, setIsReady] = useState(false)
  const [isCelebrationReady, setIsCelebrationReady] = useState(false)

  const { t } = useTranslation()

  const fireworkRef = useRef<LottieView>(null)
  const wasFrozenRef = useRef(false)

  const isFrozenPending = useMemo(() => !!streakFrozen, [streakFrozen])

  const isVisible = useMemo(
    () => showDailyStreakSuccessModal && isReady,
    [showDailyStreakSuccessModal, isReady]
  )

  const motivationText = useMemo(
    () =>
      dailyStreakFreeze?.motivationAt
        ? t('modal.modalDailyStreakSuccess.freeze_motivation', {
            value: dailyStreakFreeze.motivationAt,
          })
        : '',
    [t, dailyStreakFreeze]
  )

  const freezeToastTitle = useMemo(() => t('streakFreeze.earned_title'), [t])
  const freezeToastMessage = useMemo(
    () => t('streakFreeze.earned_message'),
    [t]
  )

  const onDismiss = useCallback(() => {
    setShowDailyStreakSuccessModal(false)

    if (dailyStreakFreeze?.earned) {
      setIsStreakFreezeToastActive(true)
    }
  }, [
    dailyStreakFreeze,
    setIsStreakFreezeToastActive,
    setShowDailyStreakSuccessModal,
  ])

  // ждём закрытия модалки «Стрик заморожен» (и небольшую паузу после неё)
  useEffect(() => {
    if (!showDailyStreakSuccessModal) {
      wasFrozenRef.current = false
      setIsReady(false)
      return
    }

    if (isFrozenPending) {
      wasFrozenRef.current = true
      setIsReady(false)
      return
    }

    const timeout = setTimeout(
      () => setIsReady(true),
      wasFrozenRef.current ? AFTER_FROZEN_DELAY_MS : 0
    )

    return () => clearTimeout(timeout)
  }, [showDailyStreakSuccessModal, isFrozenPending])

  useEffect(() => {
    if (!isVisible) {
      setIsCelebrationReady(false)
      return
    }

    const timeout = setTimeout(
      () => setIsCelebrationReady(true),
      CELEBRATION_DELAY_MS
    )

    return () => clearTimeout(timeout)
  }, [isVisible])

  useEffect(() => {
    if (isCelebrationReady) {
      fireworkRef.current?.play()
    }
  }, [isCelebrationReady])

  useEffect(() => {
    if (!isStreakFreezeToastActive) return

    const showTimeout = setTimeout(
      () =>
        toast.info(
          freezeToastMessage,
          freezeToastTitle,
          FREEZE_TOAST_DURATION_MS
        ),
      FREEZE_TOAST_DELAY_MS
    )
    const doneTimeout = setTimeout(
      () => setIsStreakFreezeToastActive(false),
      FREEZE_TOAST_DELAY_MS + FREEZE_TOAST_DURATION_MS + FREEZE_TOAST_EXIT_MS
    )

    return () => {
      clearTimeout(showTimeout)
      clearTimeout(doneTimeout)
    }
  }, [
    isStreakFreezeToastActive,
    freezeToastMessage,
    freezeToastTitle,
    setIsStreakFreezeToastActive,
  ])

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

        <LottieView
          source={require('../../shared/json/fire.json')}
          autoPlay
          loop
          style={styles.emoji}
        />

        {dailyStreakAnimation ? (
          <AnimatedCounter
            mode="slide"
            withHaptic
            start={isCelebrationReady}
            from={dailyStreakAnimation.from}
            value={dailyStreakAnimation.to}
            colorFrom={theme.colors.streak.dim}
            colorTo={theme.colors.streak.bright}
          />
        ) : (
          <></>
        )}

        <Text style={styles.title}>
          {t('modal.modalDailyStreakSuccess.title')}
        </Text>

        {motivationText ? (
          <View style={styles.motivation}>
            <Text style={styles.motivationIcon}>❄️</Text>
            <Text style={styles.motivationText}>{motivationText}</Text>
          </View>
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

export default memo(ModalDailyStreakSuccess)
