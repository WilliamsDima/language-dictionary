import { useCallback, useEffect, useState } from 'react'
import DeviceInfo from 'react-native-device-info'
import { useActions } from '@/shared/hooks/useActions'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useLazyGetLatestReleaseQuery } from '@/shared/API/services/appRelease/AppReleaseQuery'
import { getUpdateKind } from '@/shared/API/services/appRelease/helpers'
import {
  getInitialPushMessage,
  subscribeForegroundPush,
  subscribePushOpened,
} from '@/shared/firebase/messaging'
import { isAppUpdatePush } from '@/shared/helpers/pushNotifications'

// пуш «Доступна новая версия» (data.type = "app_update") открывает глобальную
// модалку обновления ModalUpdateApp. Нажатие на пуш из закрытого состояния
// (getInitialNotification) или из фона (onNotificationOpenedApp) и сам пуш при
// открытом приложении (onMessage — тост вместо этого не показывается, см.
// getForegroundPushToast) только запоминают намерение; когда сплэш показан,
// перечитываем latest.json (закэшированный при старте манифест мог устареть)
// и показываем модалку — в том числе для версии, отложенной кнопкой «Позже»:
// пользователь сам нажал на пуш. Если обновления по latest.json нет (уже
// обновился / манифест недоступен) — просто остаёмся в приложении
export const useOpenAppUpdatePush = () => {
  const { setShowUpdateModal } = useActions()
  const { isWatchSplash } = useAppSelector((store) => store.app)

  const [hasPendingOpen, setHasPendingOpen] = useState(false)

  const [fetchLatestRelease] = useLazyGetLatestReleaseQuery()

  const onPush = useCallback((data?: Record<string, unknown> | null) => {
    if (isAppUpdatePush(data)) {
      setHasPendingOpen(true)
    }
  }, [])

  const openUpdateModal = useCallback(async () => {
    const latestRelease = await fetchLatestRelease()
      .unwrap()
      .catch(() => null)

    if (
      latestRelease &&
      getUpdateKind(DeviceInfo.getVersion(), latestRelease.versionName) !==
        'none'
    ) {
      setShowUpdateModal(true)
    }
  }, [fetchLatestRelease, setShowUpdateModal])

  useEffect(() => {
    getInitialPushMessage().then((message) => onPush(message?.data))

    const unsubscribeOpened = subscribePushOpened((message) =>
      onPush(message.data)
    )
    const unsubscribeForeground = subscribeForegroundPush((message) =>
      onPush(message.data)
    )

    return () => {
      unsubscribeOpened()
      unsubscribeForeground()
    }
  }, [onPush])

  useEffect(() => {
    if (!hasPendingOpen || !isWatchSplash) return

    setHasPendingOpen(false)
    openUpdateModal()
  }, [hasPendingOpen, isWatchSplash, openUpdateModal])
}
