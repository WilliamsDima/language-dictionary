import { useCallback, useEffect, useState } from 'react'
import { IItem } from '@/entities/Item/model/item'
import { useLazyGetItemsQuery } from '@/pages/MainScreen/api/cardsServices'
import { useAppSelector } from './useStore'

// собирает все карточки пользователя одним запросом к бэкенду (`all=true`)
// вместо постраничного page-walk
export const useAllItems = () => {
  const { isAuth } = useAppSelector((store) => store.app)
  const [getItems] = useLazyGetItemsQuery()

  const [allItems, setAllItems] = useState<IItem[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchAll = useCallback(async () => {
    if (!isAuth) return

    setIsLoading(true)

    try {
      const res = await getItems({
        filter: { status: 'ALL' },
        all: true,
      }).unwrap()

      setAllItems(res.items)
    } finally {
      setIsLoading(false)
    }
  }, [isAuth, getItems])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return { allItems, isLoading, refetch: fetchAll }
}
