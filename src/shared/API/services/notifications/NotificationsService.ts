import { request } from '@/shared/API/request'
import type {
  DeleteDeviceResponse,
  DeviceResponse,
  NotificationSettings,
  RegisterDevicePayload,
  UpdateNotificationSettingsPayload,
} from './types'

class NotificationsService {
  registerDevice(payload: RegisterDevicePayload) {
    return request<DeviceResponse>('/me/devices', {
      method: 'PUT',
      json: payload,
    })
  }

  deleteDevice(token: string) {
    return request<DeleteDeviceResponse>(
      `/me/devices/${encodeURIComponent(token)}`,
      { method: 'DELETE' }
    )
  }

  getSettings() {
    return request<NotificationSettings>('/me/notification-settings', {
      method: 'GET',
    })
  }

  updateSettings(payload: UpdateNotificationSettingsPayload) {
    return request<NotificationSettings>('/me/notification-settings', {
      method: 'PUT',
      json: payload,
    })
  }
}

export const notificationsService = new NotificationsService()
