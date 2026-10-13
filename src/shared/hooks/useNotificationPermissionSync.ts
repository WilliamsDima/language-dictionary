import { useCallback, useEffect } from 'react'
import { AppState } from 'react-native'
import { useActions } from './useActions'
import { checkNotificationPermission } from '@/shared/firebase/messaging'
import { appStorage } from '@/shared/storage/mmkv.storage'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'

// держит appSlice.hasNotificationPermission в актуальном состоянии: проверка
// при старте и при каждом возврате приложения в foreground — пользователь мог
// включить/выключить уведомления в настройках телефона, пока был вне приложения
export const useNotificationPermissionSync = () => {
  const { setHasNotificationPermission } = useActions()

  const syncPermission = useCallback(async () => {
    const isGranted = await checkNotificationPermission()

    if (isGranted) {
      appStorage.delete(LOCAL_KEYS.notificationPermissionBlocked)
    }

    setHasNotificationPermission(isGranted)
  }, [setHasNotificationPermission])

  useEffect(() => {
    syncPermission()

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        syncPermission()
      }
    })

    return () => subscription.remove()
  }, [syncPermission])
}
