import { useCallback } from 'react'
import { getUserData, updateUserProfile } from '../firebase/api'
import { IActivityMonth } from '../store/slice/userSlice'
import { useActions } from './useActions'
import { useAppSelector } from './useStore'

type Props = {
  totalTimeSpent?: number
  openApp?: boolean
  activeDay?: string
  addedCard?: boolean
  viewedAds?: boolean
  startTraningCards?: boolean
  studiedCard?: boolean
  repeatCard?: boolean
}

export const useUserActivity = () => {
  const { setFirebaseData } = useActions()
  const { firebaseData } = useAppSelector((store) => store.user)

  const updateActivity = useCallback(
    async (data: Props) => {
      // console.log('updateActivity data', data)
      // console.log('updateActivity firebaseData', firebaseData)

      const {
        totalTimeSpent,
        openApp,
        activeDay,
        addedCard,
        viewedAds,
        startTraningCards,
        studiedCard,
        repeatCard,
      } = data

      const user = await getUserData(firebaseData?.uid)
      const activityData = user?.activity

      if (!firebaseData?.uid || !activityData) return

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

      // Создаем копию, так как мутировать `activityData` напрямую нельзя
      const activity = JSON.parse(JSON.stringify(activityData))

      if (!activity.year) {
        activity.year = {}
      }

      // года ещё нет
      if (!activity.year[year]) {
        activity.year[year] = {}
      }

      // месяца ещё нет
      if (!activity.year[year][month]) {
        activity.year[year][month] = defaultMonth
      }

      // Обновляем значения времени
      if (totalTimeSpent) {
        activity.year[year][month].totalTimeSpent += totalTimeSpent
      }

      // открыл приложение
      if (openApp) {
        activity.year[year][month].openApp += 1
      }

      // активные дни
      if (activeDay) {
        if (!activity.year[year][month].activeDays.includes(activeDay)) {
          activity.year[year][month].activeDays.push(activeDay)
        }
      }

      // добавление карточек
      if (addedCard) {
        activity.year[year][month].addedCards += 1
      }

      // посмотрел рекламу
      if (viewedAds) {
        activity.year[year][month].viewedAds += 1
      }

      // зашел на повторение карточкек
      if (startTraningCards) {
        activity.year[year][month].startTraningCards += 1
      }

      // количество раз изучил карточку
      if (studiedCard) {
        activity.year[year][month].studiedCard += 1
      }

      // количество раз повторил карточку
      if (repeatCard) {
        activity.year[year][month].repeatCard += 1
      }

      // console.log('month', activity.year[year][month])

      await updateUserProfile(firebaseData.uid, { activity })
      setFirebaseData({
        ...firebaseData,
        activity,
      })
    },
    [firebaseData, setFirebaseData]
  )

  return {
    updateActivity,
  }
}
