import React, { FC, useCallback, useMemo } from 'react'
import { Linking } from 'react-native'
import NotificationSwitch from '../NotificationSwitch/NotificationSwitch'
import { useActions } from '@/shared/hooks/useActions'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useTranslation } from '@/shared/i18n/types'
import {
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} from '@/shared/API/services/notifications/NotificationsQuery'
import { requestNotificationPermission } from '@/shared/firebase/messaging'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'
import { appStorage } from '@/shared/storage/mmkv.storage'

// переключатель пушей «Доступна новая версия» (app_update_enabled). Как и
// ReminderSwitch, показывает итоговое состояние: флаг на сервере И системное
// разрешение на уведомления. Включение без разрешения сразу запрашивает его
// системным диалогом (отдельной шторки нет — она про напоминания); если
// диалог заблокирован — включаем флаг и ведём в настройки телефона,
// переключатель загорится при возврате с разрешением
const AppUpdateSwitch: FC = () => {
  const { setHasNotificationPermission } = useActions()
  const { hasNotificationPermission } = useAppSelector((store) => store.app)

  const { data: settings } = useGetNotificationSettingsQuery()
  const [updateSettings] = useUpdateNotificationSettingsMutation()

  const { t } = useTranslation()

  const isEnabled = useMemo(
    () => !!settings?.app_update_enabled && !!hasNotificationPermission,
    [hasNotificationPermission, settings?.app_update_enabled]
  )

  const isDisabled = useMemo(() => !settings, [settings])

  const enable = useCallback(async () => {
    if (hasNotificationPermission) {
      updateSettings({ app_update_enabled: true })
      return
    }

    const result = await requestNotificationPermission()

    if (result === 'granted') {
      appStorage.delete(LOCAL_KEYS.notificationPermissionBlocked)
      setHasNotificationPermission(true)
      updateSettings({ app_update_enabled: true })
      return
    }

    if (result === 'blocked') {
      appStorage.setBoolean(LOCAL_KEYS.notificationPermissionBlocked, true)
      updateSettings({ app_update_enabled: true })
      Linking.openSettings()
    }
  }, [hasNotificationPermission, setHasNotificationPermission, updateSettings])

  const onToggle = useCallback(
    (value: boolean) => {
      if (value) {
        enable()
        return
      }

      updateSettings({ app_update_enabled: false })
    },
    [enable, updateSettings]
  )

  return (
    <NotificationSwitch
      title={t('settingsScreen.app_updates')}
      description={t('settingsScreen.app_updates_subtitle')}
      value={isEnabled}
      disabled={isDisabled}
      onValueChange={onToggle}
    />
  )
}

export default AppUpdateSwitch
