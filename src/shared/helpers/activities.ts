import type { I18t } from '../i18n/types'
import type { IActivityMonth, IUserActivity } from '../store/slice/userSlice'

export const getActiveDaysInYear = (activity: IUserActivity | null | undefined, year: number) => {
  const activityYear = activity?.year?.[year]

  if (!activityYear) return 0

  const daysSet = new Set<string>()

  const months: IActivityMonth[] = Object.values(activityYear)

  months.forEach((month) => {
    month.activeDays.forEach((day) => {
      daysSet.add(day)
    })
  })

  return daysSet.size
}

export const getMostActiveMonthInYear = (activity: IUserActivity | null | undefined, year: number) => {
  const activityYear = activity?.year?.[year]
  if (!activityYear) return null

  const months: IActivityMonth[] = Object.values(activityYear)

  const mostActive = months.reduce<{ mostActiveMonth: string | null; activeCountInMonth: number }>(
    (acc, month) => {
      const activeDaysCount = month.activeDays.length
      const date = new Date(month.activeDays[0]?.split('.').reverse().join('-'))
      const name = date.toLocaleString('default', { month: 'long' })

      if (acc.activeCountInMonth < activeDaysCount) {
        return { mostActiveMonth: name, activeCountInMonth: activeDaysCount }
      }

      return acc
    },
    { mostActiveMonth: null, activeCountInMonth: 0 }
  )

  if (mostActive.mostActiveMonth === null) return null

  return mostActive
}

type YearCardsStatsAcc = { total: number; topMonth: string | null; topMonthValue: number }

export const getYearAddedCardsStats = (activity: IUserActivity | null | undefined, year: number) => {
  const activityYear = activity?.year?.[year]

  if (!activityYear) return { total: 0, topMonth: null }

  const months: IActivityMonth[] = Object.values(activityYear)

  return months.reduce<YearCardsStatsAcc>(
    (acc, month) => {
      const total = acc.total + month.addedCards

      if (month.addedCards > acc.topMonthValue) {
        const date = new Date(month.activeDays[0]?.split('.').reverse().join('-'))
        const name = date.toLocaleString('default', { month: 'long' })

        return { total, topMonth: name, topMonthValue: month.addedCards }
      }

      return { ...acc, total }
    },
    { total: 0, topMonth: null, topMonthValue: 0 }
  )
}

export const getYearStudiedCardsStats = (activity: IUserActivity | null | undefined, year: number) => {
  const activityYear = activity?.year?.[year]

  if (!activityYear) return { total: 0, topMonth: null }

  const months: IActivityMonth[] = Object.values(activityYear)

  return months.reduce<YearCardsStatsAcc>(
    (acc, month) => {
      const total = acc.total + month.studiedCard

      if (month.studiedCard > acc.topMonthValue) {
        const date = new Date(month.activeDays[0]?.split('.').reverse().join('-'))
        const name = date.toLocaleString('default', { month: 'long' })

        return { total, topMonth: name, topMonthValue: month.studiedCard }
      }

      return { ...acc, total }
    },
    { total: 0, topMonth: null, topMonthValue: 0 }
  )
}

export const getYearRepeatCardsStats = (activity: IUserActivity | null | undefined, year: number) => {
  const activityYear = activity?.year?.[year]

  if (!activityYear) return { total: 0, topMonth: null }

  const months: IActivityMonth[] = Object.values(activityYear)

  return months.reduce<YearCardsStatsAcc>(
    (acc, month) => {
      const total = acc.total + month.repeatCard

      if (month.repeatCard > acc.topMonthValue) {
        const date = new Date(month.activeDays[0]?.split('.').reverse().join('-'))
        const name = date.toLocaleString('default', { month: 'long' })

        return { total, topMonth: name, topMonthValue: month.repeatCard }
      }

      return { ...acc, total }
    },
    { total: 0, topMonth: null, topMonthValue: 0 }
  )
}

export const formatTime = (seconds: number, t: I18t) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0)
    return `${hours} ${t('time.hours')} ${minutes} ${t('time.minutes')}`
  if (minutes > 0)
    return `${minutes} ${t('time.minutes')} ${secs} ${t('time.secs')}`
  return `${secs} ${t('time.secs')}`
}

export const getYearTotalTime = (
  activity: IUserActivity | null | undefined,
  year: number,
  t: I18t
) => {
  const activityYear = activity?.year?.[year]

  if (!activityYear)
    return { totalSeconds: 0, formatted: `0 ${t('time.secs')}` }

  const months: IActivityMonth[] = Object.values(activityYear)

  const totalSeconds = months.reduce((acc, month) => acc + month.totalTimeSpent, 0)

  return {
    totalSeconds,
    formatted: formatTime(totalSeconds, t),
  }
}

export const getYearStartTraningCardsStats = (
  activity: IUserActivity | null | undefined,
  year: number
) => {
  const activityYear = activity?.year?.[year]

  if (!activityYear) return { total: 0, topMonth: null }

  const months: IActivityMonth[] = Object.values(activityYear)

  return months.reduce<YearCardsStatsAcc>(
    (acc, month) => {
      const total = acc.total + month.startTraningCards

      if (month.startTraningCards > acc.topMonthValue) {
        const date = new Date(month.activeDays[0]?.split('.').reverse().join('-'))
        const name = date.toLocaleString('default', { month: 'long' })

        return { total, topMonth: name, topMonthValue: month.startTraningCards }
      }

      return { ...acc, total }
    },
    { total: 0, topMonth: null, topMonthValue: 0 }
  )
}

export const getYearTotaltOpenApp = (activity: IUserActivity | null | undefined, year: number) => {
  const activityYear = activity?.year?.[year]

  if (!activityYear) return 0

  const months: IActivityMonth[] = Object.values(activityYear)

  return months.reduce((acc, month) => acc + month.openApp, 0)
}

export const getYearTotaltViewedAds = (activity: IUserActivity | null | undefined, year: number) => {
  const activityYear = activity?.year?.[year]

  if (!activityYear) return 0

  const months: IActivityMonth[] = Object.values(activityYear)

  return months.reduce((acc, month) => acc + month.viewedAds, 0)
}
