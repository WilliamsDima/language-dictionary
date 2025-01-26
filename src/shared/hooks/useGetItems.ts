import { useEffect } from 'react'
import { useActions } from './useActions'
import { useAppSelector } from './useStore'
import { useGetItemsQuery } from '@/pages/MainScreen/api/cardsServices'

export const useGetItems = () => {
  const { setItems } = useActions()

  const { isAuth } = useAppSelector((store) => store.app)
  const { firebaseData } = useAppSelector((store) => store.user)

  const { data } = useGetItemsQuery(
    {
      uid: firebaseData?.uid,
    },
    { skip: !firebaseData?.uid || !isAuth }
  )

  useEffect(() => {
    if (isAuth && data) {
      setItems(data.items)
    }
  }, [isAuth, data])
}
