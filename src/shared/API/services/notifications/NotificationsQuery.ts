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

    // частичный PUT: шлём только меняемый флаг. Оптимистично переключаем его,
    // чтобы свитч в настройках реагировал сразу; при ошибке откатываем, при
    // успехе кладём ответ сервера (полный объект настроек)
    updateNotificationSettings: build.mutation<
      NotificationSettings,
      UpdateNotificationSettingsPayload
    >({
      async queryFn(payload) {
        return toRtkQueryResult(await notificationsService.updateSettings(payload))
      },
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          notificationsAPI.util.updateQueryData(
            'getNotificationSettings',
            undefined,
            (draft) => {
              Object.assign(draft, payload)
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
