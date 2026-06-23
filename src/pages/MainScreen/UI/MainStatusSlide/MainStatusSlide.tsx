import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { IItem, StatusItem } from '@/entities/Item/model/item'
import MainList from '@/widgets/MainList/UI/MainList/MainList'
import type { MainButtonSideValue } from '@/shared/store/slice/userSlice'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useLazyGetItemsQuery } from '../../api/cardsServices'

type Props = {
  status: StatusItem
  mainButtonSide: MainButtonSideValue
}

const MainStatusSlide: FC<Props> = ({ status, mainButtonSide }) => {
  const { firebaseData } = useAppSelector((store) => store.user)
  const { search, filterMain, itemsRevision } = useAppSelector(
    (store) => store.items
  )

  const [items, setItems] = useState<Record<number, IItem> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastVisible, setLastVisible] = useState<unknown>()
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  const page = useRef(1)
  const [getItems] = useLazyGetItemsQuery()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
    }, 400)

    return () => {
      clearTimeout(timeout)
    }
  }, [search])

  const languageKey = useMemo(() => {
    return filterMain?.languages?.join('|') || ''
  }, [filterMain?.languages])

  const mapItemsToRecord = useCallback((nextItems: IItem[]) => {
    return nextItems.reduce<Record<number, IItem>>((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})
  }, [])

  const fetchItems = useCallback(() => {
    if (!firebaseData?.uid) {
      return
    }

    page.current = 1
    setIsLoading(true)
    setLastVisible(undefined)

    getItems({
      uid: firebaseData.uid,
      filter: {
        status,
        search: debouncedSearch,
        filter: {
          sortDate: filterMain?.sortDate || 'desc',
          languages: filterMain?.languages,
        },
      },
      limitCount: 10,
      page: 1,
    })
      .then((res) => {
        if (res.data?.items) {
          setItems(mapItemsToRecord(res.data.items))
          setLastVisible(res.data.lastVisible)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [
    debouncedSearch,
    filterMain?.languages,
    filterMain?.sortDate,
    firebaseData?.uid,
    getItems,
    mapItemsToRecord,
    status,
  ])

  useEffect(() => {
    fetchItems()
  }, [fetchItems, itemsRevision, languageKey])

  const loadMoreItems = useCallback(() => {
    if (!firebaseData?.uid || isLoading || !lastVisible) {
      return
    }

    setIsLoading(true)

    getItems({
      uid: firebaseData.uid,
      filter: {
        status,
        search: debouncedSearch,
        filter: {
          sortDate: filterMain?.sortDate || 'desc',
          languages: filterMain?.languages,
        },
      },
      limitCount: 10,
      page: page.current + 1,
      lastVisible,
    })
      .then((res) => {
        const nextItems = res.data?.items

        if (nextItems?.length) {
          setLastVisible(res.data?.lastVisible)
          page.current = page.current + 1

          setItems((prev) => {
            return {
              ...(prev || {}),
              ...mapItemsToRecord(nextItems),
            }
          })
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [
    debouncedSearch,
    filterMain?.languages,
    filterMain?.sortDate,
    firebaseData?.uid,
    getItems,
    isLoading,
    lastVisible,
    mapItemsToRecord,
    status,
  ])

  const count = useMemo(() => {
    return Object.keys(items || {}).length
  }, [items])

  const isFilterActive = useMemo(() => {
    return (
      status !== 'ALL' || !!debouncedSearch || !!filterMain?.languages?.length
    )
  }, [debouncedSearch, filterMain?.languages?.length, status])

  return (
    <MainList
      count={count}
      isFilterActive={isFilterActive}
      isLoading={isLoading}
      items={items}
      loadMoreItems={loadMoreItems}
      side={mainButtonSide}
    />
  )
}

export default MainStatusSlide
