export type ToastType = 'error' | 'success' | 'info'

export type ToastConfig = {
  id: string
  message: string
  title?: string
  type: ToastType
  duration?: number
}
