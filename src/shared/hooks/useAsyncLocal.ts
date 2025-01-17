import { useEffect } from 'react'
import { useActions } from './useActions'
import { getAsyncLocal } from '../helpers/asyncStorage'
import { LOCAL_KEYS } from '../constants/localStorage'

export const useAsyncLocal = () => {
  const { setLastSaveData } = useActions()

  const getLastSaveData = async () => {
    const value = await getAsyncLocal(LOCAL_KEYS.saveDate)

    if (value) setLastSaveData(value)
  }

  useEffect(() => {
    getLastSaveData()
  }, [])
}
