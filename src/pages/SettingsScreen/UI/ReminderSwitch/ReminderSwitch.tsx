import React, { FC, useCallback, useMemo } from 'react'
import NotificationSwitch from '../NotificationSwitch/NotificationSwitch'
import { useActions } from '@/shared/hooks/useActions'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useTranslation } from '@/shared/i18n/types'
import {
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} from '@/shared/API/services/notifications/NotificationsQuery'
import { DEFAULT_DAILY_REMINDER_TIME } from '@/shared/helpers/pushNotifications'

// переключатель ежедневных напоминаний. Показывает итоговое состояние:
// включён = флаг на сервере И системное разрешение на уведомления
// (appSlice.hasNotificationPermission перепроверяется при возврате в
// приложение). Без разрешения включение идёт через ModalReminderPermission
const ReminderSwitch: FC = () => {
  const { setShowReminderPermissionModal } = useActions()
  const { hasNotificationPermission } = useAppSelector((store) => store.app)

  const { data: settings } = useGetNotificationSettingsQuery()
  const [updateSettings] = useUpdateNotificationSettingsMutation()

  const { t } = useTranslation()

  const isEnabled = useMemo(
    () => !!settings?.daily_reminder_enabled && !!hasNotificationPermission,
    [hasNotificationPermission, settings?.daily_reminder_enabled]
  )

  const isDisabled = useMemo(() => !settings, [settings])

  const description = useMemo(
    () =>
      t('settingsScreen.reminders_subtitle', {
        time: settings?.daily_reminder_time || DEFAULT_DAILY_REMINDER_TIME,
      }),
    [settings?.daily_reminder_time, t]
  )

  const onToggle = useCallback(
    (value: boolean) => {
      if (!value) {
        updateSettings({ daily_reminder_enabled: false })
        return
      }

      if (hasNotificationPermission) {
        updateSettings({ daily_reminder_enabled: true })
        return
      }

      setShowReminderPermissionModal(true)
    },
    [hasNotificationPermission, setShowReminderPermissionModal, updateSettings]
  )

  return (
    <NotificationSwitch
      title={t('settingsScreen.reminders')}
      description={description}
      value={isEnabled}
      disabled={isDisabled}
      onValueChange={onToggle}
    />
  )
}

export default ReminderSwitch
