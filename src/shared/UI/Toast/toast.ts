import { ToastConfig } from './types'

type ShowInput = Omit<ToastConfig, 'id'>

type ToastRef = {
  show: (config: ShowInput) => void
}

const _refHolder: { current: ToastRef | null } = { current: null }

export const _registerToast = (ref: ToastRef | null): void => {
  _refHolder.current = ref
}

export const toast = {
  error: (message: string, duration?: number): void => {
    _refHolder.current?.show({ message, type: 'error', duration })
  },
  success: (message: string, duration?: number): void => {
    _refHolder.current?.show({ message, type: 'success', duration })
  },
}
