import { useEffect, useRef } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { useUserActivity } from './useUserActivity'
import { useAppSelector } from './useStore'

export const useTimeTracker = () => {
  const time = useRef<number>(0)

  const { firebaseData } = useAppSelector((store) => store.user)

  const { updateActivity } = useUserActivity()

  const updateTime = (seconds: number) => {
    console.log('updateTime seconds', seconds)
    // Гарантируем выполнение перед уходом в фон
    updateActivity({ totalTimeSpent: seconds })
  }

  useEffect(() => {
    let subscription: any

    if (firebaseData) {
      time.current = Date.now() // Запоминаем, когда пользователь зашел
      const handleAppStateChange = (nextAppState: AppStateStatus) => {
        console.log('nextAppState', nextAppState)

        if (nextAppState === 'active') {
          time.current = Date.now()
        }
        if (nextAppState.match(/inactive|background/)) {
          const timeSpent = Math.floor((Date.now() - time.current) / 1000) // Время в секундах

          console.log('timeSpent', timeSpent)

          if (timeSpent) {
            updateTime(timeSpent)
          }

          time.current = 0
        }
      }

      subscription = AppState.addEventListener('change', handleAppStateChange)
    }
    return () => subscription && subscription?.remove()
  }, [firebaseData])
}
