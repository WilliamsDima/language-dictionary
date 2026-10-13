import React, { FC, useCallback, useMemo } from 'react'
import { Switch, View } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './ReminderSwitch.styles'
import Text from '@/shared/UI/Text/Text'
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
  const { theme } = useUnistyles()

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

  const trackColor = useMemo(
    () => ({
      false: theme.colors.palette.border,
      true: theme.colors.palette.primery,
    }),
    [theme.colors.palette.border, theme.colors.palette.primery]
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
    <View style={styles.container}>
      <Text style={styles.title}>{t('settingsScreen.reminders')}</Text>

      <View style={styles.row}>
        <Text style={styles.text}>{description}</Text>

        <Switch
          value={isEnabled}
          disabled={isDisabled}
          onValueChange={onToggle}
          trackColor={trackColor}
          thumbColor={theme.colors.base.white}
        />
      </View>
    </View>
  )
}

export default ReminderSwitch
