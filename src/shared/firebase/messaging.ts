import { PermissionsAndroid, Platform } from 'react-native'
import {
  AuthorizationStatus,
  getInitialNotification,
  getMessaging,
  getToken,
  hasPermission,
  onMessage,
  onNotificationOpenedApp,
  onTokenRefresh,
  setBackgroundMessageHandler,
  type RemoteMessage,
} from '@react-native-firebase/messaging'

// granted — уведомления разрешены; denied — отказали, но системный диалог
// ещё можно показать; blocked — система больше не покажет диалог (второй
// отказ на Android 13+ или уведомления выключены в настройках на Android <13),
// включить можно только в настройках телефона
export type NotificationPermissionResult = 'granted' | 'denied' | 'blocked'

// POST_NOTIFICATIONS — runtime-разрешение только с Android 13 (API 33)
const RUNTIME_PERMISSION_API_LEVEL = 33

export const getFcmToken = async (): Promise<string | null> => {
  try {
    return await getToken(getMessaging())
  } catch (error) {
    console.log('getFcmToken error', error)
    return null
  }
}

export const subscribeFcmTokenRefresh = (listener: (token: string) => void) =>
  onTokenRefresh(getMessaging(), listener)

// итоговое «уведомления показываются»: на Android это
// NotificationManagerCompat.areNotificationsEnabled — учитывает и runtime-
// разрешение (13+), и выключатель уведомлений приложения в настройках (<13)
export const checkNotificationPermission = async (): Promise<boolean> => {
  try {
    const status = await hasPermission(getMessaging())

    return status === AuthorizationStatus.AUTHORIZED
  } catch {
    return false
  }
}

export const requestNotificationPermission =
  async (): Promise<NotificationPermissionResult> => {
    if (await checkNotificationPermission()) {
      return 'granted'
    }

    // до Android 13 разрешение выдаётся при установке — раз уведомления
    // всё равно выключены, значит их выключили в настройках телефона
    if (
      Platform.OS !== 'android' ||
      Number(Platform.Version) < RUNTIME_PERMISSION_API_LEVEL
    ) {
      return 'blocked'
    }

    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    )

    if (result === PermissionsAndroid.RESULTS.GRANTED) return 'granted'
    if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) return 'blocked'

    return 'denied'
  }

// пуш, по нажатию на который приложение запустилось из закрытого состояния
export const getInitialPushMessage = async (): Promise<RemoteMessage | null> => {
  try {
    return await getInitialNotification(getMessaging())
  } catch {
    return null
  }
}

// нажатие на пуш, когда приложение было в фоне
export const subscribePushOpened = (
  listener: (message: RemoteMessage) => void
) => onNotificationOpenedApp(getMessaging(), listener)

// пуш, пришедший при открытом приложении: в foreground Android сам
// уведомление не показывает
export const subscribeForegroundPush = (
  listener: (message: RemoteMessage) => void
) => onMessage(getMessaging(), listener)

// пуши с notification-блоком Android показывает сам, JS-обработка в фоне не
// нужна; пустой обработчик регистрируем только чтобы RNFB не ругался
// «No background message handler has been set». Вызывать из index.js
export const registerBackgroundPushHandler = () => {
  setBackgroundMessageHandler(getMessaging(), async () => {})
}
