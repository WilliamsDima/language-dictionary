import { useEffect } from 'react'
import { getAplicationData } from '../firebase/api'
import { useActions } from './useActions'
import { useGetItems } from './useGetItems'

export const useGlobalData = () => {
  const { setAppData } = useActions()

  useGetItems()

  const getAppData = async () => {
    const data = await getAplicationData()
    setAppData(data as any)
  }

  useEffect(() => {
    getAppData()
  }, [])
}
