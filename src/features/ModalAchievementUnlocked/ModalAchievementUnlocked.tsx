import React, { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Modal, View } from 'react-native'
import LottieView from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import ScreenBackground from '@/shared/UI/Layout/ScreenBackground'
import { useAchievements } from '@/shared/hooks/useAchievements'
import { getNewlyUnlockedAchievements } from '@/shared/helpers/getNewlyUnlockedAchievements'
import type { AchievementWithProgress } from '@/shared/API/services/achievements/types'
import { styles } from './ModalAchievementUnlocked.styles'

type Props = {}

// та же задержка перед фейерверком, что и в ModalDailyStreakSuccess — даём
// модалке проявиться, прежде чем запускать анимацию
const CELEBRATION_DELAY_MS = 450

const TRANSPARENT_GRADIENT: [string, string] = ['transparent', 'transparent']

// глобальная модалка успеха разблокировки достижения. Разблокировка
// (unlocked/unlocked_at) вычисляется и персистится бэкендом "на чтение"
// (GET /achievements) — конкретное действие (тренировка/создание карточки/
// смена статуса/стрик) лишь просит перечитать список через invalidatesTags.
// Поэтому именно здесь, в единственном компоненте, всегда смонтированном в
// корне навигации (см. AppRoutes), держим постоянную подписку на этот
// запрос и сравниваем снимки между собой — это не привязывает обнаружение
// разблокировки к жизненному циклу экрана достижений
const ModalAchievementUnlocked: FC<Props> = () => {
  const [queue, setQueue] = useState<AchievementWithProgress[]>([])
  const [isCelebrationReady, setIsCelebrationReady] = useState(false)

  const { data } = useAchievements()

  const previousAchievementsRef = useRef<AchievementWithProgress[] | undefined>(
    undefined
  )
  const fireworkRef = useRef<LottieView>(null)

  // показываем разблокировки по одной, даже если пересеклось сразу
  // несколько порогов за одно действие
  const current = useMemo(() => queue[0], [queue])

  const gradientColors = useMemo((): [string, string] => {
    return current ? [current.color_from, current.color_to] : TRANSPARENT_GRADIENT
  }, [current])

  const gradientStart = useMemo(() => ({ x: 0, y: 0 }), [])
  const gradientEnd = useMemo(() => ({ x: 1, y: 1 }), [])

  const onDismiss = useCallback(() => {
    setQueue((prev) => prev.slice(1))
  }, [])

  useEffect(() => {
    if (!data) return

    const newlyUnlocked = getNewlyUnlockedAchievements(
      previousAchievementsRef.current,
      data
    )

    if (newlyUnlocked.length) {
      setQueue((prev) => [...prev, ...newlyUnlocked])
    }

    previousAchievementsRef.current = data
  }, [data])

  useEffect(() => {
    if (!current) {
      setIsCelebrationReady(false)
      return
    }

    const timeout = setTimeout(
      () => setIsCelebrationReady(true),
      CELEBRATION_DELAY_MS
    )

    return () => clearTimeout(timeout)
  }, [current])

  useEffect(() => {
    if (isCelebrationReady) {
      fireworkRef.current?.play()
    }
  }, [isCelebrationReady])

  return (
    <Modal
      visible={!!current}
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
              start={gradientStart}
              end={gradientEnd}
              style={styles.badge}
            >
              <Text style={styles.icon}>{current.icon}</Text>
            </LinearGradient>

            <Text style={styles.eyebrow}>Новое достижение!</Text>
            <Text style={styles.title}>{current.title}</Text>
            <Text style={styles.description}>{current.description}</Text>
          </>
        ) : (
          <></>
        )}

        <Button type="PRIMERY" style={styles.btn} onPress={onDismiss}>
          Отлично
        </Button>
      </View>
    </Modal>
  )
}

export default memo(ModalAchievementUnlocked)
