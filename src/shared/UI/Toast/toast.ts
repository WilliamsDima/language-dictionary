import { ToastConfig } from './types'

type ShowInput = Omit<ToastConfig, 'id'>

type ToastRef = {
  show: (config: ShowInput) => void
}

let _ref: ToastRef | null = null

export const _registerToast = (ref: ToastRef | null): void => {
  _ref = ref
}

export const toast = {
  error: (message: string, duration?: number): void => {
    _ref?.show({ message, type: 'error', duration })
  },
  success: (message: string, duration?: number): void => {
    _ref?.show({ message, type: 'success', duration })
  },
}
