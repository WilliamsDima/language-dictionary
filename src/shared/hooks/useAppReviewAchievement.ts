import { useMemo } from 'react'
import { APP_REVIEWER_ACHIEVEMENT_CODE } from '@/shared/API/services/achievements/constants'
import { useAchievements } from './useAchievements'

// единая точка чтения статуса достижения "оставил отзыв о приложении" —
// им пользуются и гейт автопоказа модалки на экране достижений
// (useAppReviewGate), и кнопка в настройках (AppReviewButton), чтобы не
// дублировать поиск по code
export const useAppReviewAchievement = () => {
  const { data: achievements } = useAchievements()

  const achievement = useMemo(
    () =>
      achievements?.find(
        (item) => item.code === APP_REVIEWER_ACHIEVEMENT_CODE
      ),
    [achievements]
  )

  const isUnlocked = useMemo(() => !!achievement?.unlocked, [achievement])

  return { achievement, isUnlocked }
}
