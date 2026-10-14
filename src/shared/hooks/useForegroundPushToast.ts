import { useEffect } from 'react'
import { subscribeForegroundPush } from '@/shared/firebase/messaging'
import { getForegroundPushToast } from '@/shared/helpers/pushNotifications'
import { toast } from '@/shared/UI/Toast/toast'

// сообщение из админки читается дольше обычного тоста
const PUSH_TOAST_DURATION = 6000

// при открытом приложении Android не показывает FCM-уведомление, а onMessage
// получает его в JS — показываем текст тостом, чтобы сообщение (например,
// ручной пуш из админки, data.type = "admin_message") не потерялось.
// Ежедневное напоминание в foreground не показываем (см. getForegroundPushToast)
export const useForegroundPushToast = () => {
  useEffect(
    () =>
      subscribeForegroundPush((message) => {
        const content = getForegroundPushToast(
          message.notification,
          message.data
        )

        if (content) {
          toast.info(content.body, content.title, PUSH_TOAST_DURATION)
        }
      }),
    []
  )
}
