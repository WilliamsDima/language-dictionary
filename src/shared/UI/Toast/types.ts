export type ToastType = 'error' | 'success'

export type ToastConfig = {
  id: string
  message: string
  type: ToastType
  duration?: number
}
