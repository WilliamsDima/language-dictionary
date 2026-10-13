import { baseApi } from '@/shared/API/baseApi'
import { toRtkQueryResult } from '@/shared/API/RTK/rtk'
import { notificationsService } from './NotificationsService'
import type {
  DeleteDeviceResponse,
  DeviceResponse,
  NotificationSettings,
  RegisterDevicePayload,
  UpdateNotificationSettingsPayload,
} from './types'

export const notificationsAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registerDevice: build.mutation<DeviceResponse, RegisterDevicePayload>({
      async queryFn(payload) {
        return toRtkQueryResult(
          await notificationsService.registerDevice(payload)
        )
      },
    }),

    deleteDevice: build.mutation<DeleteDeviceResponse, string>({
      async queryFn(token) {
        return toRtkQueryResult(await notificationsService.deleteDevice(token))
      },
    }),

    getNotificationSettings: build.query<NotificationSettings, void>({
      async queryFn() {
        return toRtkQueryResult(await notificationsService.getSettings())
      },
      providesTags: ['notificationSettings'],
    }),

    // оптимистично переключаем флаг, чтобы свитч в настройках реагировал
    // сразу; при ошибке откатываем, при успехе кладём ответ сервера
    updateNotificationSettings: build.mutation<
      NotificationSettings,
      UpdateNotificationSettingsPayload
    >({
      async queryFn(payload) {
        return toRtkQueryResult(await notificationsService.updateSettings(payload))
      },
      async onQueryStarted(
        { daily_reminder_enabled },
        { dispatch, queryFulfilled }
      ) {
        const patch = dispatch(
          notificationsAPI.util.updateQueryData(
            'getNotificationSettings',
            undefined,
            (draft) => {
              draft.daily_reminder_enabled = daily_reminder_enabled
            }
          )
        )

        try {
          const { data } = await queryFulfilled
          dispatch(
            notificationsAPI.util.upsertQueryData(
              'getNotificationSettings',
              undefined,
              data
            )
          )
        } catch {
          patch.undo()
        }
      },
    }),
  }),
})

export const {
  useRegisterDeviceMutation,
  useDeleteDeviceMutation,
  useGetNotificationSettingsQuery,
  useLazyGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} = notificationsAPI
