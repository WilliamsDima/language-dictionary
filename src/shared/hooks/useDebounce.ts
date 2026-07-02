import {useCallback, useEffect, useRef, useState} from 'react'

export const useDebouncedValue = <Value>(value: Value, delay: number): Value => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

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
