import React, { FC, memo, useCallback, useEffect, useRef, useState } from 'react'
import { Modal, View } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import LottieView from 'lottie-react-native'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import ScreenBackground from '@/shared/UI/Layout/ScreenBackground'
import { AnimatedCounter } from '@/shared/UI/AnimatedCounter/AnimatedCounter'
import { useActions } from '@/shared/hooks/useActions'
import { useAppSelector } from '@/shared/hooks/useStore'
import { styles } from './ModalDailyStreakSuccess.styles'

type Props = {}

// даём модалке проявиться, прежде чем запускать фейерверк и слайд цифр —
// иначе анимации почти заканчиваются, пока пользователь только успевает
// перевести взгляд на экран
const CELEBRATION_DELAY_MS = 450

// глобальная модалка успеха задания дня — видимость и данные анимации
// приходят из appSlice, куда их кладёт StreakQuery после completeStreak
const ModalDailyStreakSuccess: FC<Props> = () => {
  const { theme } = useUnistyles()
  const { setShowDailyStreakSuccessModal } = useActions()
  const { showDailyStreakSuccessModal, dailyStreakAnimation } = useAppSelector(
    (store) => store.app
  )

  const [isCelebrationReady, setIsCelebrationReady] = useState(false)

  const fireworkRef = useRef<LottieView>(null)

  const onDismiss = useCallback(() => {
    setShowDailyStreakSuccessModal(false)
  }, [setShowDailyStreakSuccessModal])

  useEffect(() => {
    if (!showDailyStreakSuccessModal) {
      setIsCelebrationReady(false)
      return
    }

    const timeout = setTimeout(
      () => setIsCelebrationReady(true),
      CELEBRATION_DELAY_MS
    )

    return () => clearTimeout(timeout)
  }, [showDailyStreakSuccessModal])

  useEffect(() => {
    if (isCelebrationReady) {
      fireworkRef.current?.play()
    }
  }, [isCelebrationReady])

  return (
    <Modal
      visible={showDailyStreakSuccessModal}
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
            start={isCelebrationReady}
            from={dailyStreakAnimation.from}
            value={dailyStreakAnimation.to}
            colorFrom={theme.colors.streak.dim}
            colorTo={theme.colors.streak.bright}
          />
        ) : (
          <></>
        )}

        <Text style={styles.title}>Серия продолжается!</Text>

        <Button type="PRIMERY" style={styles.btn} onPress={onDismiss}>
          Отлично
        </Button>
      </View>
    </Modal>
  )
}

export default memo(ModalDailyStreakSuccess)
