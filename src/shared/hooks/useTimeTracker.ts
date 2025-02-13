import { useEffect, useRef, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { useUserActivity } from './useUserActivity'
import { useAppSelector } from './useStore'
import { getAsyncLocal, setAsyncLocal } from '../helpers/asyncStorage'
import { LOCAL_KEYS } from '../constants/localStorage'

export const useTimeTracker = () => {
  const time = useRef<number>(0)

  const { firebaseData } = useAppSelector((store) => store.user)

  const [isInit, setIsInit] = useState(false)

  const { updateActivity } = useUserActivity()

  useEffect(() => {
    if (firebaseData && !isInit) {
      setIsInit(true)
      ;(async () => {
        await updateActivity({
          openApp: true,
          activeDay: new Date().toLocaleDateString(),
        })

        const timeSpent = await getAsyncLocal(LOCAL_KEYS.timeSpent)

        if (!!timeSpent) {
          await updateActivity({
            totalTimeSpent: timeSpent,
            activeDay: new Date().toLocaleDateString(),
          })
          setAsyncLocal(LOCAL_KEYS.timeSpent, 0)
        }

        time.current = Date.now() // Запоминаем, когда пользователь зашел

        const handleAppStateChange = (nextAppState: AppStateStatus) => {
          if (nextAppState.match(/inactive|background/)) {
            const timeSpent = Math.floor((Date.now() - time.current) / 1000) // Время в секундах

            setAsyncLocal(LOCAL_KEYS.timeSpent, timeSpent)
          }
        }

        AppState.addEventListener('change', handleAppStateChange)
      })()
    }
  }, [firebaseData, isInit])
}
