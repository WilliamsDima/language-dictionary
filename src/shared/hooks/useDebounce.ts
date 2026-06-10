import {useCallback, useRef} from 'react'

export const useCallbackDebounce = <Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number
) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const debouncedCallback = useCallback(
    (...args: Args) => {
      if (timer.current) {
        clearTimeout(timer.current)
      }

      timer.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )

  return debouncedCallback
}
