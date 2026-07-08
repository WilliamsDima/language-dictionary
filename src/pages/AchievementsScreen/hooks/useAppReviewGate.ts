import { useEffect } from 'react'
import { useActions } from '@/shared/hooks/useActions'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useAchievements } from '@/shared/hooks/useAchievements'
import { useAppReviewAchievement } from '@/shared/hooks/useAppReviewAchievement'
import { getAsyncLocal } from '@/shared/helpers/asyncStorage'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'

// не более одного автопоказа модалки отзыва за время жизни приложения —
// иначе повторный визит на экран достижений (до явного закрытия модалки
// крестиком/оверлеем) показывал бы её на каждый маунт экрана
const hasAutoShownThisLaunch = { current: false }

// автопоказ модалки "оставить отзыв" на экране достижений: один раз, если
// достижение app_reviewer ещё не разблокировано и пользователь раньше не
// закрывал модалку явно (см. ModalAppReview — именно он взводит тот же
// локальный флаг appReviewModalDismissed при закрытии крестиком/оверлеем)
export const useAppReviewGate = () => {
  const { setShowAppReviewModal } = useActions()
  const { showAppReviewModal } = useAppSelector((store) => store.app)

  const { data: achievements } = useAchievements()
  const { isUnlocked } = useAppReviewAchievement()

  useEffect(() => {
    if (!achievements || isUnlocked || hasAutoShownThisLaunch.current) return

    const cancelled = { current: false }

    ;(async () => {
      const dismissed = await getAsyncLocal(
        LOCAL_KEYS.appReviewModalDismissed,
        true
      )

      if (!cancelled.current && !dismissed && !showAppReviewModal) {
        hasAutoShownThisLaunch.current = true
        setShowAppReviewModal(true)
      }
    })()

    return () => {
      cancelled.current = true
    }
  }, [achievements, isUnlocked, showAppReviewModal, setShowAppReviewModal])
}
