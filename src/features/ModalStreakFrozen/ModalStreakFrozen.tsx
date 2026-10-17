import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Modal, View } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import LinearGradient from 'react-native-linear-gradient'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import ScreenBackground from '@/shared/UI/Layout/ScreenBackground'
import { useActions } from '@/shared/hooks/useActions'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useMarkFrozenDaysSeenMutation } from '@/shared/API/services/streak/StreakQuery'
import type { StreakFrozenInfo } from '@/shared/API/services/streak/types'
import { useGetAppConfigQuery } from '@/shared/API/services/appConfig/AppConfigQuery'
import { selectHasYearResultSlides } from '@/shared/API/services/appConfig/selectors'
import { type I18NKeys, useTranslation } from '@/shared/i18n/types'
import FrozenStreakHero from './UI/FrozenStreakHero/FrozenStreakHero'
import { styles } from './ModalStreakFrozen.styles'

type Props = {}

// та же задержка, что и в ModalDailyStreakSuccess, — даём модалке
// проявиться, прежде чем «замораживать» цифру
const ANIMATION_DELAY_MS = 450

const FROST_START = { x: 0.5, y: 0 }
const FROST_END = { x: 0.5, y: 0.6 }

// глобальная модалка «Стрик заморожен»: показывает, сколько заморозок ушло
// на пропущенные дни и сколько осталось. Данные кладёт в appSlice
// StreakQuery — из ответа completeStreak (заморозки тратятся при первом
// задании после пропуска) или из GET /streak, если там остались
// неподтверждённые даты. Показывается раньше модалки успеха задания дня
// (та ждёт её закрытия) и уступает только итогам года. По кнопке
// подтверждаем показ через POST /streak/freezes/seen
const ModalStreakFrozen: FC<Props> = () => {
  const { theme } = useUnistyles()
  const { dismissStreakFrozen, resetStreakFrozen } = useActions()
  const { isAuth, isWatchSplash, showYearResult, streakFrozen } =
    useAppSelector((store) => store.app)

  // последние показанные данные — чтобы содержимое не пропадало, пока
  // модалка гаснет после закрытия (streakFrozen к этому моменту уже null)
  const [displayed, setDisplayed] = useState<StreakFrozenInfo | null>(null)
  const [isAnimationReady, setIsAnimationReady] = useState(false)

  const [markFrozenDaysSeen] = useMarkFrozenDaysSeenMutation()
  const { hasYearResultSlides } = useGetAppConfigQuery(undefined, {
    skip: !isAuth,
    selectFromResult: selectHasYearResultSlides,
  })

  const { t } = useTranslation()

  const isYearResultVisible = useMemo(
    () => showYearResult && hasYearResultSlides,
    [showYearResult, hasYearResultSlides]
  )

  // isWatchSplash — не показываемся поверх сплэш-экрана при запуске
  const isVisible = useMemo(
    () => isAuth && isWatchSplash && !isYearResultVisible && !!streakFrozen,
    [isAuth, isWatchSplash, isYearResultVisible, streakFrozen]
  )

  const frostColors = useMemo(
    () => [
      theme.colors.streak.frozenGlow,
      theme.colors.palette.dark_alpha_0,
    ],
    [theme]
  )

  const streakValue = useMemo(() => displayed?.streak ?? 0, [displayed])

  const summaryText = useMemo(() => {
    if (!displayed) return ''

    return t('modal.modalStreakFrozen.summary', {
      spent: t('modal.modalStreakFrozen.spent' as I18NKeys, {
        count: displayed.dates.length,
      }),
      left: t('modal.modalStreakFrozen.left' as I18NKeys, {
        count: displayed.left,
      }),
    })
  }, [t, displayed])

  const onDismiss = useCallback(() => {
    if (!streakFrozen) return

    dismissStreakFrozen()
    markFrozenDaysSeen(streakFrozen.dates)
  }, [dismissStreakFrozen, markFrozenDaysSeen, streakFrozen])

  useEffect(() => {
    if (streakFrozen) {
      setDisplayed(streakFrozen)
    }
  }, [streakFrozen])

  // логаут/смена аккаунта — сбрасываем ожидающую модалку и показанные даты
  useEffect(() => {
    if (!isAuth) {
      resetStreakFrozen()
    }
  }, [isAuth, resetStreakFrozen])

  useEffect(() => {
    if (!isVisible) {
      setIsAnimationReady(false)
      return
    }

    const timeout = setTimeout(
      () => setIsAnimationReady(true),
      ANIMATION_DELAY_MS
    )

    return () => clearTimeout(timeout)
  }, [isVisible])

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
      style={styles.modal}
      onRequestClose={onDismiss}
    >
      <View style={styles.content}>
        <ScreenBackground />

        <LinearGradient
          pointerEvents="none"
          colors={frostColors}
          start={FROST_START}
          end={FROST_END}
          style={styles.frost}
        />

        <FrozenStreakHero value={streakValue} start={isAnimationReady} />

        <Text style={styles.title}>{t('modal.modalStreakFrozen.title')}</Text>
        <Text style={styles.subtitle}>
          {t('modal.modalStreakFrozen.subtitle')}
        </Text>

        {summaryText ? (
          <View style={styles.summary}>
            <Text style={styles.summaryText}>{summaryText}</Text>
          </View>
        ) : (
          <></>
        )}

        <Button type="PRIMERY" style={styles.btn} onPress={onDismiss}>
          {t('modal.modalStreakFrozen.ok')}
        </Button>
      </View>
    </Modal>
  )
}

export default memo(ModalStreakFrozen)
