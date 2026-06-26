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

  let mostActiveMonth: string | null = null
  let activeCountInMonth: number = 0

  const months: IActivityMonth[] = Object.values(activityYear)

  months.forEach((month) => {
    const activeDaysCount = month.activeDays.length
    const date = new Date(month.activeDays[0]?.split('.').reverse().join('-'))
    const name = date.toLocaleString('default', { month: 'long' })

    if (activeCountInMonth < activeDaysCount) {
      activeCountInMonth = activeDaysCount
      mostActiveMonth = name
    }
  })

  if (mostActiveMonth === null) return null

  return {
    mostActiveMonth,
    activeCountInMonth,
  }
}

export const getYearAddedCardsStats = (activity: IUserActivity | null | undefined, year: number) => {
  const activityYear = activity?.year?.[year]

  if (!activityYear) return { total: 0, topMonth: null }

  let total = 0
  let topMonth = null
  let topMonthValue = 0

  const months: IActivityMonth[] = Object.values(activityYear)

  months.forEach((month) => {
    total += month.addedCards

    if (month.addedCards > topMonthValue) {
      topMonthValue = month.addedCards

      const date = new Date(month.activeDays[0]?.split('.').reverse().join('-'))
      const name = date.toLocaleString('default', { month: 'long' })

      topMonth = name
    }
  })

  return { total, topMonth, topMonthValue }
}

export const getYearStudiedCardsStats = (activity: IUserActivity | null | undefined, year: number) => {
  const activityYear = activity?.year?.[year]

  if (!activityYear) return { total: 0, topMonth: null }

  let total = 0
  let topMonth = null
  let topMonthValue = 0

  const months: IActivityMonth[] = Object.values(activityYear)

  months.forEach((month) => {
    total += month.studiedCard

    if (month.studiedCard > topMonthValue) {
      topMonthValue = month.studiedCard

      const date = new Date(month.activeDays[0]?.split('.').reverse().join('-'))
      const name = date.toLocaleString('default', { month: 'long' })

      topMonth = name
    }
  })

  return { total, topMonth, topMonthValue }
}

export const getYearRepeatCardsStats = (activity: IUserActivity | null | undefined, year: number) => {
  const activityYear = activity?.year?.[year]

  if (!activityYear) return { total: 0, topMonth: null }

  let total = 0
  let topMonth = null
  let topMonthValue = 0

  const months: IActivityMonth[] = Object.values(activityYear)

  months.forEach((month) => {
    total += month.repeatCard

    if (month.repeatCard > topMonthValue) {
      topMonthValue = month.repeatCard

      const date = new Date(month.activeDays[0]?.split('.').reverse().join('-'))
      const name = date.toLocaleString('default', { month: 'long' })

      topMonth = name
    }
  })

  return { total, topMonth, topMonthValue }
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

  let totalSeconds = 0

  const months: IActivityMonth[] = Object.values(activityYear)

  months.forEach((month) => {
    totalSeconds += month.totalTimeSpent
  })

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

  let total = 0
  let topMonth = null
  let topMonthValue = 0

  const months: IActivityMonth[] = Object.values(activityYear)

  months.forEach((month) => {
    total += month.startTraningCards

    if (month.startTraningCards > topMonthValue) {
      topMonthValue = month.startTraningCards

      const date = new Date(month.activeDays[0]?.split('.').reverse().join('-'))
      const name = date.toLocaleString('default', { month: 'long' })

      topMonth = name
    }
  })

  return { total, topMonth, topMonthValue }
}

export const getYearTotaltOpenApp = (activity: IUserActivity | null | undefined, year: number) => {
  const activityYear = activity?.year?.[year]

  if (!activityYear) return 0

  let total = 0

  const months: IActivityMonth[] = Object.values(activityYear)

  months.forEach((month) => {
    total += month.openApp
  })

  return total
}

export const getYearTotaltViewedAds = (activity: IUserActivity | null | undefined, year: number) => {
  const activityYear = activity?.year?.[year]

  if (!activityYear) return 0

  let total = 0

  const months: IActivityMonth[] = Object.values(activityYear)

  months.forEach((month) => {
    total += month.viewedAds
  })

  return total
}
