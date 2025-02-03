import { useEffect, useState } from 'react'
import { useActions } from './useActions'
import { useAppSelector } from './useStore'
import { useLazyGetItemsQuery } from '@/pages/MainScreen/api/cardsServices'

export const useGetItems = () => {
  const { setItems } = useActions()

  const { isAuth } = useAppSelector((store) => store.app)
  const { firebaseData } = useAppSelector((store) => store.user)
  const { items } = useAppSelector((store) => store.items)

  const [isInitial, setIsInitial] = useState(false)

  const [getItems] = useLazyGetItemsQuery()

  useEffect(() => {
    if (isAuth && !items.length && !isInitial && firebaseData?.uid) {
      setIsInitial(true)

      getItems({ uid: firebaseData?.uid }).then((res) => {
        if (res.data?.items) setItems(res.data?.items)
      })
    }

    if (!isAuth) {
      setIsInitial(false)
    }
  }, [isAuth, items, isInitial, firebaseData])
}
