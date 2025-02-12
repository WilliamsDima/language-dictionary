import React, {
  FC,
  useMemo,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import { useAppSelector } from './useStore'
import { IItem } from '@/entities/Item/model/item'
import { useCallbackDebounce } from './useDebounce'
import { useCards } from './useCards'

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
  updateItemHandler: (itemEdit: IItem) => Promise<void> | undefined
  addItemHandler: (item: IItem) => Promise<void> | undefined
  deleteItemHandler: (idDoc: string) => Promise<void> | undefined
}

const CardContext = createContext<IContext>({} as IContext)

type CardsProviderType = {
  children: ReactNode
}

export const CardProvider: FC<CardsProviderType> = ({ children }) => {
  const { isAuth } = useAppSelector((store) => store.app)
  const { filterByStatus, search, items } = useAppSelector(
    (store) => store.items
  )

  const {
    debouncedSearch,
    allItems,
    setDebouncedSearch,
    setIsLoading,
    getItemsHandler,
    setAllItems,
    setLastVisible,
    addItemHandler,
    deleteItemHandler,
    loadMoreItems,
    page,
    isLoading,
    counts,
    firebaseData,
    updateItemHandler,
  } = useCards()

  const isFilterActive = useMemo(() => {
    return !!filterByStatus || !!debouncedSearch
  }, [filterByStatus, debouncedSearch])

  // Используем дебаунс для поиска
  const debouncedSearchHandler = useCallbackDebounce((value: string) => {
    setDebouncedSearch(value)
  }, 500)

  // первый запрос для главного экрана
  useEffect(() => {
    if (!allItems.length && isAuth && firebaseData) {
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
  }, [allItems, isAuth, firebaseData])

  // Обновляем значение дебаунса при изменении search
  useEffect(() => {
    debouncedSearchHandler(search)
  }, [search, debouncedSearchHandler])

  // поиск
  useEffect(() => {
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
  }, [debouncedSearch])

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
      updateItemHandler,
      addItemHandler,
      deleteItemHandler,
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
    updateItemHandler,
    addItemHandler,
    deleteItemHandler,
  ])

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>
}

export const useCardsContext = () => {
  return useContext(CardContext)
}
