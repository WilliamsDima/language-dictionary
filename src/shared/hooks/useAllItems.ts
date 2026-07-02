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
      const fetchPage = async (
        page: number,
        lastVisible: unknown,
        collected: IItem[]
      ): Promise<IItem[]> => {
        const res = await getItems({
          filter: { status: 'ALL' },
          limitCount: PAGE_SIZE,
          page,
          lastVisible,
        }).unwrap()

        const nextCollected = collected.concat(res.items)

        return res.lastVisible !== undefined
          ? fetchPage(page + 1, res.lastVisible, nextCollected)
          : nextCollected
      }

      const collected = await fetchPage(1, undefined, [])

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
