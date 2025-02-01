import React, {
  FC,
  useMemo,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useAppSelector } from './useStore'
import { IItem } from '@/entities/Item/model/item'
import { useCallbackDebounce } from './useDebounce'
import { useLazyGetItemsQuery } from '@/pages/MainScreen/api/cardsServices'

type IContext = {
  isFilterActive: boolean
  allItems: IItem[]
  loadMoreItems: () => void
  counts: {
    ALL: number
    READY: number
    STUDY: number
  }
  isLoading: boolean
  page: React.MutableRefObject<number>
  setLastVisible: React.Dispatch<any>
  setAllItems: React.Dispatch<React.SetStateAction<IItem[]>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const MainContext = createContext<IContext>({} as IContext)

type AuthProviderType = {
  children: ReactNode
}

export const MainProvider: FC<AuthProviderType> = ({ children }) => {
  const { firebaseData } = useAppSelector((store) => store.user)
  const { filterByStatus, search, filterMain, items } = useAppSelector(
    (store) => store.items
  )

  const page = useRef<number>(1)

  const [allItems, setAllItems] = useState<IItem[]>([]) // для хранения всех элементов
  const [lastVisible, setLastVisible] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)

  // Локальное состояние для дебаунсированного поиска
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  const [getItems] = useLazyGetItemsQuery()

  // Используем дебаунс для поиска
  const debouncedSearchHandler = useCallbackDebounce((value: string) => {
    setDebouncedSearch(value)
  }, 500)

  const isFilterActive = useMemo(() => {
    return !!filterByStatus || !!debouncedSearch
  }, [filterByStatus, debouncedSearch])

  const counts = useMemo(() => {
    return {
      ALL: items.length,
      READY: items.filter((it) => it.status === 'READY').length,
      STUDY: items.filter((it) => it.status === 'STUDY').length,
    }
  }, [items])

  const getItemsHandler = (page: number) => {
    return getItems({
      uid: firebaseData?.uid,
      filter: {
        status: filterByStatus,
        search: debouncedSearch,
        filter: {
          sortDate: filterMain?.sortDate,
          languages: filterMain?.languages,
        },
      },
      limitCount: 10,
      page,
      lastVisible,
    })
  }

  // Функция для загрузки данных с пагинацией
  // Обрабатываем загрузку новых элементов при достижении конца списка
  const loadMoreItems = () => {
    if (!firebaseData || isLoading || !lastVisible) return

    console.log('loadMoreItems')

    setIsLoading(true)

    getItemsHandler(page.current + 1)
      .then((res) => {
        if (res?.data?.items) {
          setLastVisible(res.data.lastVisible)
          setAllItems((prevItems) => {
            return [...prevItems, ...res.data?.items!]
          })
        }
      })
      .finally(() => {
        setIsLoading(false)
        page.current = page.current + 1
      })
  }

  useEffect(() => {
    if (!allItems.length) {
      setIsLoading(true)
      getItemsHandler(1)
        .then((res) => {
          if (res?.data?.items) {
            setAllItems(res?.data.items)
            setLastVisible(res.data.lastVisible)
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [allItems])

  // Обновляем значение дебаунса при изменении search
  useEffect(() => {
    debouncedSearchHandler(search)
  }, [search, debouncedSearchHandler])

  const value = useMemo(() => {
    return {
      isFilterActive,
      allItems,
      counts,
      isLoading,
      page,
      loadMoreItems,
      setLastVisible,
      setAllItems,
      setIsLoading,
    }
  }, [
    isFilterActive,
    allItems,
    isLoading,
    counts,
    page,
    loadMoreItems,
    setLastVisible,
    setAllItems,
    setIsLoading,
  ])

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>
}

export const useMainScreen = () => {
  return useContext(MainContext)
}
