import { useEffect, useState } from 'react'
import { useActions } from './useActions'
import { useAppSelector } from './useStore'
import { useLazyGetItemsQuery } from '@/pages/MainScreen/api/cardsServices'
import { IItem } from '@/entities/Item/model/item'

export const useGetItems = () => {
  const { setItems } = useActions()

  const { isAuth } = useAppSelector((store) => store.app)
  const { firebaseData } = useAppSelector((store) => store.user)
  const { items } = useAppSelector((store) => store.items)

  const [isInitial, setIsInitial] = useState(false)

  const [getItems] = useLazyGetItemsQuery()

  useEffect(() => {
    if (
      isAuth &&
      !Object.keys(items).length &&
      !isInitial &&
      firebaseData?.uid
    ) {
      setIsInitial(true)

      getItems({ uid: firebaseData?.uid }).then((res) => {
        if (res.data?.items) {
          const obj: Record<number, IItem> = {}

          res.data?.items.forEach((it) => {
            obj[it.id] = it
          })

          setItems(obj)
        }
      })
    }

    if (!isAuth) {
      setIsInitial(false)
    }
  }, [isAuth, items, isInitial, firebaseData])
}
