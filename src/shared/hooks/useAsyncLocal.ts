import { useEffect } from 'react'
import { useActions } from './useActions'
import { getAsyncLocal } from '../helpers/asyncStorage'
import { LOCAL_KEYS } from '../constants/localStorage'
import { isShowModalYearResult } from '../constants/app'

export const useAsyncLocal = () => {
  const { setLastSaveData, setShowYearResult } = useActions()

  const getLastSaveData = async () => {
    const value = await getAsyncLocal(LOCAL_KEYS.saveDate)

    if (value) setLastSaveData(value)
  }

  const getWatchYearResult = async () => {
    const date = new Date()

    const value = await getAsyncLocal(
      `${LOCAL_KEYS.watchYearResult}-${date.getFullYear()}`,
      true
    )

    if (!value && isShowModalYearResult) {
      setShowYearResult(true)
    }
  }

  useEffect(() => {
    getLastSaveData()
    getWatchYearResult()
  }, [])
}
