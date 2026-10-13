import { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useStartDailyChallenge } from '@/shared/hooks/useStartDailyChallenge'
import {
  getInitialPushMessage,
  subscribePushOpened,
} from '@/shared/firebase/messaging'
import { isDailyReminderPush } from '@/shared/helpers/pushNotifications'
import { navigationRef } from '../ref'

// нажатие на ежедневное напоминание открывает задание дня — тем же входом,
// что огонёк и кнопка практики в TabBar (useStartDailyChallenge).
// Холодный старт (getInitialNotification) и выход из фона
// (onNotificationOpenedApp) только запоминают намерение; переход выполняется,
// когда пользователь авторизован, сплэш показан (MainTabRoutes уже без
// сплэша) и навигация готова. Пуш в foreground не показываем — onMessage
// не слушаем
export const useOpenReminderPush = () => {
  const { isAuth, isWatchSplash } = useAppSelector((store) => store.app)

  const [hasPendingOpen, setHasPendingOpen] = useState(false)

  const startDailyChallenge = useStartDailyChallenge()

  const canNavigate = useMemo(
    () => isAuth && isWatchSplash,
    [isAuth, isWatchSplash]
  )

  useEffect(() => {
    getInitialPushMessage().then((message) => {
      if (isDailyReminderPush(message?.data)) {
        setHasPendingOpen(true)
      }
    })

    return subscribePushOpened((message) => {
      if (isDailyReminderPush(message.data)) {
        setHasPendingOpen(true)
      }
    })
  }, [])

  useEffect(() => {
    if (!hasPendingOpen || !canNavigate || !navigationRef.isReady()) return

    setHasPendingOpen(false)
    startDailyChallenge()
  }, [canNavigate, hasPendingOpen, startDailyChallenge])
}
