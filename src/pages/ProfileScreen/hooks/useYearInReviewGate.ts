import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import { useGetAppConfigQuery } from '@/shared/API/services/appConfig/AppConfigQuery'
import { isWithinYearInReviewWindow } from '@/shared/helpers/yearInReview'
import { getAsyncLocal } from '@/shared/helpers/asyncStorage'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'

// гейтинг показа "итогов года": кнопка на профиле доступна только внутри
// админ-настроенного окна (месяц/день), и это пересчитывается заново на
// каждый маунт/фокус экрана профиля — а не один раз при загрузке модуля,
// как было раньше с захардкоженной датой
export const useYearInReviewGate = () => {
  const { showYearResult } = useAppSelector((store) => store.app)
  const { setShowYearResult } = useActions()

  const { data: appConfig } = useGetAppConfigQuery()

  const [focusedAt, setFocusedAt] = useState<number>(() => Date.now())

  useFocusEffect(
    useCallback(() => {
      setFocusedAt(Date.now())
    }, [])
  )

  // время берём на момент маунта/последнего фокуса экрана (а не тикаем в
  // реальном времени, пока экран открыт) — этого достаточно, чтобы гейт не
  // застревал на устаревшем результате, если пользователь вернулся на профиль
  // спустя долгое время
  const isAvailable = useMemo(() => {
    return isWithinYearInReviewWindow(
      appConfig?.year_in_review?.window,
      new Date(focusedAt)
    )
  }, [appConfig?.year_in_review?.window, focusedAt])

  useEffect(() => {
    if (!isAvailable || showYearResult) return

    const cancelled = { current: false }

    ;(async () => {
      const year = new Date().getFullYear()
      const alreadyWatched = await getAsyncLocal(
        `${LOCAL_KEYS.watchYearResult}-${year}`,
        true
      )

      if (!cancelled.current && !alreadyWatched) {
        setShowYearResult(true)
      }
    })()

    return () => {
      cancelled.current = true
    }
  }, [isAvailable, showYearResult, setShowYearResult])

  const showManually = useCallback(() => {
    setShowYearResult(true)
  }, [setShowYearResult])

  return {
    isAvailable,
    showManually,
  }
}
