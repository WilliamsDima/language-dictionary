import { useEffect, useState } from 'react'
import { useActions } from './useActions'
import { useAppSelector } from './useStore'
import { useGetItemsQuery } from '@/pages/MainScreen/api/cardsServices'

export const useGetItems = () => {
  const { setItems } = useActions()

  const { isAuth } = useAppSelector((store) => store.app)
  const { firebaseData } = useAppSelector((store) => store.user)
  const { items } = useAppSelector((store) => store.items)

  const [isInitial, setIsInitial] = useState(false)

  const { data } = useGetItemsQuery(
    {
      uid: firebaseData?.uid,
    },
    { skip: !firebaseData?.uid || !isAuth }
  )

  useEffect(() => {
    if (isAuth && data && !items.length && !isInitial) {
      setIsInitial(true)
      setItems(data.items)
    }

    if (!isAuth) {
      setIsInitial(false)
    }
  }, [isAuth, data, items, isInitial])
}
