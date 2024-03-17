import { useEffect } from 'react'
import { getAplicationData } from '../firebase/api'
import { useActions } from './useActions'

export const useGlobalData = () => {
  const { setAppData } = useActions()

  const getAppData = async () => {
    const data = await getAplicationData()
    setAppData(data as any)
  }

  useEffect(() => {
    getAppData()
  }, [])
}
