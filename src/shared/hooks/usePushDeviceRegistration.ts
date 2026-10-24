import { useCallback, useEffect, useMemo, useRef } from 'react'
import { AppState } from 'react-native'
import { getTimeZone } from 'react-native-localize'
import DeviceInfo from 'react-native-device-info'
import { useAppSelector } from './useStore'
import { useRegisterDeviceMutation } from '@/shared/API/services/notifications/NotificationsQuery'
import {
  getFcmToken,
  subscribeFcmTokenRefresh,
} from '@/shared/firebase/messaging'
import { toDeviceLocale } from '@/shared/helpers/pushNotifications'

// регистрирует FCM-токен устройства на бэкенде (PUT /me/devices) после логина
// и на каждом старте, при обновлении токена, смене языка интерфейса и смене
// таймзоны (проверяем при возврате в foreground). Регистрация не зависит от
// разрешения на уведомления: сервер шлёт пуш только при включённом флаге, а без
// разрешения Android его просто не покажет — зато как только пользователь
// разрешит уведомления (в том числе в настройках телефона), напоминания сразу
// заработают без отдельной перерегистрации.
// Ждём isWatchSplash: к этому моменту сплэш применил сохранённый язык
export const usePushDeviceRegistration = () => {
  const { isAuth, isWatchSplash, appLanguage } = useAppSelector(
    (store) => store.app
  )

  const [registerDevice] = useRegisterDeviceMutation()

  // последняя успешно отправленная связка token|timezone|locale|app_version —
  // не шлём одинаковый upsert повторно. Ref живёт только в памяти, поэтому
  // после обновления приложения (новый процесс) устройство перерегистрируется
  // с новой app_version на первом же старте
  const lastRegisteredRef = useRef<string | null>(null)

  const isEnabled = useMemo(
    () => isAuth && isWatchSplash,
    [isAuth, isWatchSplash]
  )

  const locale = useMemo(
    () => toDeviceLocale(appLanguage?.code),
    [appLanguage?.code]
  )

  const register = useCallback(
    async (token: string) => {
      const payload = {
        token,
        timezone: getTimeZone(),
        locale,
        app_version: DeviceInfo.getVersion(),
      }
      const key = [
        payload.token,
        payload.timezone,
        payload.locale,
        payload.app_version,
      ].join('|')

      if (lastRegisteredRef.current === key) return

      lastRegisteredRef.current = key

      try {
        await registerDevice(payload).unwrap()
      } catch {
        // сеть/ошибка сервера — попробуем при следующем старте или
        // возврате в приложение
        lastRegisteredRef.current = null
      }
    },
    [locale, registerDevice]
  )

  const registerCurrentToken = useCallback(async () => {
    const token = await getFcmToken()

    if (token) {
      await register(token)
    }
  }, [register])

  useEffect(() => {
    if (!isEnabled) {
      lastRegisteredRef.current = null
      return
    }

    registerCurrentToken()

    const unsubscribeTokenRefresh = subscribeFcmTokenRefresh(register)
    const appStateSubscription = AppState.addEventListener(
      'change',
      (state) => {
        if (state === 'active') {
          registerCurrentToken()
        }
      }
    )

    return () => {
      unsubscribeTokenRefresh()
      appStateSubscription.remove()
    }
  }, [isEnabled, register, registerCurrentToken])
}
