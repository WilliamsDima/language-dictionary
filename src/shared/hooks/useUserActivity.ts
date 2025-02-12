import { useCallback } from 'react'
import { updateUserProfile } from '../firebase/api'
import { IActivityMonth } from '../store/slice/userSlice'
import { useActions } from './useActions'
import { useAppSelector } from './useStore'
import { produce } from 'immer'

type Props = {
  totalTimeSpent?: number
}

export const useUserActivity = () => {
  const { setFirebaseData } = useActions()
  const { firebaseData } = useAppSelector((store) => store.user)

  const updateActivity = useCallback(
    (data: Props) => {
      console.log('updateActivity data', data)

      const { totalTimeSpent } = data
      if (!firebaseData?.uid || !firebaseData?.activity) return

      console.log(11111)

      const year = new Date().getFullYear()
      const month = new Date().getMonth()

      const defaultMonth: IActivityMonth = {
        activeDays: [],
        addedCards: 0,
        openApp: 0,
        repeatCard: 0,
        startTraningCards: 0,
        studiedCard: 0,
        totalTimeSpent: 0,
        viewedAds: 0,
      }

      // Используем immer для изменения состояния
      const activity = produce(firebaseData.activity, (draft) => {
        // года ещё нету
        if (!draft.year[year]) {
          draft.year[year] = {}
        }

        // месяца ещё нету
        if (!draft.year[year][month]) {
          draft.year[year][month] = defaultMonth
        }

        // обновляем время
        if (totalTimeSpent) {
          draft.year[year][month].totalTimeSpent += totalTimeSpent
        }
      })

      console.log('activity', activity)

      updateUserProfile(firebaseData.uid, { activity })
      setFirebaseData({
        ...firebaseData,
        activity,
      })
    },
    [firebaseData]
  )

  return {
    updateActivity,
  }
}
