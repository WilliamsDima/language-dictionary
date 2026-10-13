import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Linking, View } from 'react-native'
import { styles } from './ModalReminderPermission.styles'
import { useActions } from '@/shared/hooks/useActions'
import { useAppSelector } from '@/shared/hooks/useStore'
import Button from '@/shared/UI/Button/Button'
import BottomSheet from '@/shared/UI/BottomSheet/BottomSheet'
import { useBottomSheet } from '@/shared/UI/BottomSheet/hooks/useBottomSheet'
import { useTranslation } from '@/shared/i18n/types'
import {
  useGetNotificationSettingsQuery,
  useLazyGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} from '@/shared/API/services/notifications/NotificationsQuery'
import { requestNotificationPermission } from '@/shared/firebase/messaging'
import { DEFAULT_DAILY_REMINDER_TIME } from '@/shared/helpers/pushNotifications'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'
import { appStorage } from '@/shared/storage/mmkv.storage'

type Step = 'prompt' | 'blocked'

const CANCEL_BTN_STYLE = [styles.btn, styles.btnCancel]
const CANCEL_BTN_CLASSES = { textBtn: styles.textBtnCancel }
const CONFIRM_BTN_CLASSES = { textBtn: styles.textBtnConfirm }

// даём модалке успеха задания дня закрыться, прежде чем выдвигать шторку
const AFTER_STREAK_SUCCESS_DELAY_MS = 500

const getInitialStep = (): Step =>
  appStorage.getBoolean(LOCAL_KEYS.notificationPermissionBlocked)
    ? 'blocked'
    : 'prompt'

// глобальная шторка включения ежедневных напоминаний. Открывается
// переключателем «Напоминания» в настройках (когда нет системного разрешения)
// и один раз сама — после первого успешного задания дня.
// prompt — пояснение перед системным диалогом POST_NOTIFICATIONS;
// blocked — система диалог больше не покажет, ведём в настройки телефона.
// Включение = системное разрешение + daily_reminder_enabled: true на сервере
const ModalReminderPermission: FC = () => {
  const { setShowReminderPermissionModal, setHasNotificationPermission } =
    useActions()
  const {
    isAuth,
    isWatchSplash,
    showReminderPermissionModal,
    showDailyStreakSuccessModal,
    hasNotificationPermission,
  } = useAppSelector((store) => store.app)

  const [step, setStep] = useState<Step>('prompt')

  const isVisible = useMemo(
    () => isAuth && isWatchSplash && showReminderPermissionModal,
    [isAuth, isWatchSplash, showReminderPermissionModal]
  )

  const { data: settings } = useGetNotificationSettingsQuery(undefined, {
    skip: !isVisible,
  })
  const [fetchSettings] = useLazyGetNotificationSettingsQuery()
  const [updateSettings] = useUpdateNotificationSettingsMutation()

  const [sheetRef, presentSheet, dismissSheet] = useBottomSheet()
  const { t } = useTranslation()
  const wasVisibleRef = useRef(false)
  const wasStreakSuccessVisibleRef = useRef(false)

  const reminderTime = useMemo(
    () => settings?.daily_reminder_time || DEFAULT_DAILY_REMINDER_TIME,
    [settings?.daily_reminder_time]
  )

  const isBlocked = useMemo(() => step === 'blocked', [step])

  const title = useMemo(
    () =>
      isBlocked
        ? t('modal.modalReminderPermission.blocked_title')
        : t('modal.modalReminderPermission.title'),
    [isBlocked, t]
  )

  const subtitle = useMemo(
    () =>
      isBlocked
        ? t('modal.modalReminderPermission.blocked_subtitle')
        : t('modal.modalReminderPermission.subtitle', { time: reminderTime }),
    [isBlocked, reminderTime, t]
  )

  const cancelText = useMemo(
    () => (isBlocked ? t('ui.cancel') : t('modal.modalReminderPermission.later')),
    [isBlocked, t]
  )

  const confirmText = useMemo(
    () =>
      isBlocked
        ? t('modal.modalReminderPermission.open_settings')
        : t('modal.modalReminderPermission.enable'),
    [isBlocked, t]
  )

  const close = useCallback(() => {
    setShowReminderPermissionModal(false)
  }, [setShowReminderPermissionModal])

  const enableReminders = useCallback(() => {
    updateSettings({ daily_reminder_enabled: true })
  }, [updateSettings])

  const onEnable = useCallback(async () => {
    const result = await requestNotificationPermission()

    if (result === 'granted') {
      appStorage.delete(LOCAL_KEYS.notificationPermissionBlocked)
      setHasNotificationPermission(true)
      enableReminders()
      close()
      return
    }

    // never_ask_again: системный диалог больше не появится — сразу
    // показываем путь через настройки телефона и запоминаем это
    if (result === 'blocked') {
      appStorage.setBoolean(LOCAL_KEYS.notificationPermissionBlocked, true)
      setStep('blocked')
      return
    }

    close()
  }, [close, enableReminders, setHasNotificationPermission])

  // намерение пользователя — включить напоминания: флаг на сервере включаем
  // сразу, а переключатель в настройках загорится, когда при возврате в
  // приложение появится системное разрешение
  const onOpenSettings = useCallback(() => {
    enableReminders()
    close()
    Linking.openSettings()
  }, [close, enableReminders])

  const onConfirm = useMemo(
    () => (isBlocked ? onOpenSettings : onEnable),
    [isBlocked, onEnable, onOpenSettings]
  )

  // после первого задания дня предлагаем напоминания один раз — только если
  // уведомлений ещё нет, система не заблокировала диалог и пользователь сам
  // не выключал напоминания
  const offerAfterFirstChallenge = useCallback(async () => {
    if (appStorage.getBoolean(LOCAL_KEYS.reminderPromptShown)) return

    appStorage.setBoolean(LOCAL_KEYS.reminderPromptShown, true)

    if (
      hasNotificationPermission ||
      appStorage.getBoolean(LOCAL_KEYS.notificationPermissionBlocked)
    ) {
      return
    }

    const result = await fetchSettings()
      .unwrap()
      .catch(() => null)

    if (result?.daily_reminder_enabled) {
      setShowReminderPermissionModal(true)
    }
  }, [fetchSettings, hasNotificationPermission, setShowReminderPermissionModal])

  // модалка успеха задания дня только что закрылась
  useEffect(() => {
    const wasStreakSuccessVisible = wasStreakSuccessVisibleRef.current
    wasStreakSuccessVisibleRef.current = showDailyStreakSuccessModal

    if (!wasStreakSuccessVisible || showDailyStreakSuccessModal) return

    const timeout = setTimeout(
      offerAfterFirstChallenge,
      AFTER_STREAK_SUCCESS_DELAY_MS
    )

    return () => clearTimeout(timeout)
  }, [offerAfterFirstChallenge, showDailyStreakSuccessModal])

  useEffect(() => {
    if (isVisible && !wasVisibleRef.current) {
      setStep(getInitialStep())
      presentSheet()
    }

    if (!isVisible && wasVisibleRef.current) {
      dismissSheet()
    }

    wasVisibleRef.current = isVisible
  }, [dismissSheet, isVisible, presentSheet])

  return (
    <BottomSheet
      sheetRef={sheetRef}
      onDismiss={close}
      title={title}
      subtitle={subtitle}
      variant="view"
      dynamicSizing
    >
      <View style={styles.btns}>
        <Button
          style={CANCEL_BTN_STYLE}
          classes={CANCEL_BTN_CLASSES}
          onPress={close}
        >
          {cancelText}
        </Button>

        <Button
          style={styles.btn}
          classes={CONFIRM_BTN_CLASSES}
          onPress={onConfirm}
        >
          {confirmText}
        </Button>
      </View>
    </BottomSheet>
  )
}

export default memo(ModalReminderPermission)
