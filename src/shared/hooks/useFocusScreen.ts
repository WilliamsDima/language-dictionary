import { useEffect } from 'react'
import { useAppNavigation } from './useNavigation'

type Props = {
  callback?: () => void
}

export const useFocusScreen = ({ callback }: Props) => {
  const { addListener, removeListener } = useAppNavigation()

  useEffect(() => {
    const listenerFocus = addListener('focus', () => {
      callback && callback()
    })

    const listenerState = addListener('blur', () => {
      callback && callback()
    })

    return () => {
      removeListener('focus', listenerFocus)
      removeListener('blur', listenerState)
    }
  }, [addListener, removeListener, callback])
}
