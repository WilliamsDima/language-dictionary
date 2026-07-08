import { useEffect } from 'react'
import { useActions } from './useActions'
import { useAppNavigation } from './useNavigation'

export const useHiddenTabBar = () => {
  const { setHiddenTabBar } = useActions()
  const { addListener, removeListener } = useAppNavigation()

  useEffect(() => {
    const listenerFocus = addListener('focus', () => {
      setHiddenTabBar(true)
    })

    const listenerState = addListener('blur', () => {
      setHiddenTabBar(false)
    })

    return () => {
      removeListener('focus', listenerFocus)
      removeListener('blur', listenerState)
    }
  }, [addListener, removeListener, setHiddenTabBar])
}
