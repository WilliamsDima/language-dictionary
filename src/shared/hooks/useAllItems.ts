import { useCallback, useEffect, useState } from 'react'
import { IItem } from '@/entities/Item/model/item'
import { useLazyGetItemsQuery } from '@/pages/MainScreen/api/cardsServices'
import { useAppSelector } from './useStore'

const PAGE_SIZE = 50

// честно собирает все карточки пользователя постранично с backend,
// а не то, что уже случайно оказалось в кэше других экранов
export const useAllItems = () => {
  const { isAuth } = useAppSelector((store) => store.app)
  const [getItems] = useLazyGetItemsQuery()

  const [allItems, setAllItems] = useState<IItem[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchAll = useCallback(async () => {
    if (!isAuth) return

    setIsLoading(true)

    try {
      let page = 1
      let lastVisible: unknown
      let collected: IItem[] = []

      do {
        const res = await getItems({
          filter: { status: 'ALL' },
          limitCount: PAGE_SIZE,
          page,
          lastVisible,
        }).unwrap()

        collected = collected.concat(res.items)
        lastVisible = res.lastVisible
        page += 1
      } while (lastVisible !== undefined)

      setAllItems(collected)
    } finally {
      setIsLoading(false)
    }
  }, [isAuth, getItems])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return { allItems, isLoading, refetch: fetchAll }
}
