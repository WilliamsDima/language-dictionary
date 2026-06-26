import { useCallback } from 'react'
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
  const { setActivity } = useActions()
  const { isAuth } = useAppSelector((store) => store.app)
  const activity = useAppSelector((store) => store.user.activity)

  const updateActivity = useCallback(
    async (data: Props) => {
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

      if (!isAuth || !activity) return

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

      const updatedActivity = JSON.parse(JSON.stringify(activity))

      if (!updatedActivity.year) {
        updatedActivity.year = {}
      }

      if (!updatedActivity.year[year]) {
        updatedActivity.year[year] = {}
      }

      if (!updatedActivity.year[year][month]) {
        updatedActivity.year[year][month] = defaultMonth
      }

      if (totalTimeSpent) {
        updatedActivity.year[year][month].totalTimeSpent += totalTimeSpent
      }

      if (openApp) {
        updatedActivity.year[year][month].openApp += 1
      }

      if (activeDay) {
        if (!updatedActivity.year[year][month].activeDays.includes(activeDay)) {
          updatedActivity.year[year][month].activeDays.push(activeDay)
        }
      }

      if (addedCard) {
        updatedActivity.year[year][month].addedCards += 1
      }

      if (viewedAds) {
        updatedActivity.year[year][month].viewedAds += 1
      }

      if (startTraningCards) {
        updatedActivity.year[year][month].startTraningCards += 1
      }

      if (studiedCard) {
        updatedActivity.year[year][month].studiedCard += 1
      }

      if (repeatCard) {
        updatedActivity.year[year][month].repeatCard += 1
      }

      setActivity(updatedActivity)
    },
    [isAuth, activity, setActivity]
  )

  return {
    updateActivity,
  }
}
