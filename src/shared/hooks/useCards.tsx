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
import {
  useAddItemMutation,
  useDeleteItemMutation,
  useLazyGetItemsQuery,
  useUpdateItemMutation,
} from '@/pages/MainScreen/api/cardsServices'
import { useActions } from './useActions'
import ItemTooltip from '../UI/Tooltips/ItemTooltip/ItemTooltip'

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
  getItemsRepetition: () => Promise<any> | undefined
}

const CardContext = createContext<IContext>({} as IContext)

type CardsProviderType = {
  children: ReactNode
}

export const CardProvider: FC<CardsProviderType> = ({ children }) => {
  const { addItemAC, deleteItemAC, updateItemAC, setTooltip } = useActions()

  const { firebaseData } = useAppSelector((store) => store.user)
  const { filterByStatus, search, filterMain, items, filterCardsModal } =
    useAppSelector((store) => store.items)

  const page = useRef<number>(1)

  const [allItems, setAllItems] = useState<IItem[]>([]) // для хранения всех элементов
  const [lastVisible, setLastVisible] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)

  // Локальное состояние для дебаунсированного поиска
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  const [getItems] = useLazyGetItemsQuery()
  const [addItemAPI] = useAddItemMutation()
  const [updateItem] = useUpdateItemMutation()
  const [deleteItem] = useDeleteItemMutation()

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

  // Используем дебаунс для поиска
  const debouncedSearchHandler = useCallbackDebounce((value: string) => {
    setDebouncedSearch(value)
  }, 500)

  // обновление карточки
  const updateItemHandler = (itemEdit: IItem) => {
    if (firebaseData && itemEdit) {
      return updateItem({
        uid: firebaseData.uid,
        idDoc: itemEdit?.idDoc!,
        updatedData: itemEdit,
      }).then((res) => {
        console.log('updateItemHandler res', res.data)

        if (res.data) {
          updateItemAC(res.data)
          setAllItems((prev) => {
            return prev.map((it) => {
              if (it.id === res.data.id) {
                return res.data
              }
              return it
            })
          })

          setTooltip({ children: <ItemTooltip type="UPDATE" />, time: 3000 })
        }
      })
    }
  }

  // добавление карточки
  const addItemHandler = (item: IItem) => {
    if (firebaseData && item) {
      return addItemAPI({
        item,
        uid: firebaseData?.uid,
      }).then((res) => {
        console.log('addItemHandler res', res.data)

        if (res.data) {
          setAllItems((prev) => {
            return [res.data, ...prev]
          })
          addItemAC(res.data)

          setTooltip({ children: <ItemTooltip type="ADD" />, time: 3000 })
        }
      })
    }
  }

  // удаление карточки
  const deleteItemHandler = (idDoc: string) => {
    console.log('deleteItemHandler idDoc', idDoc)
    if (firebaseData && idDoc) {
      return deleteItem({
        idDoc,
        uid: firebaseData.uid,
      }).then((res) => {
        console.log('deleteItemHandler res', res)

        if (res.data?.success) {
          setAllItems((prev) => {
            return prev.filter((it) => it.idDoc !== idDoc)
          })
          deleteItemAC(idDoc)

          setTooltip({ children: <ItemTooltip type="DELETE" />, time: 3000 })
        }
      })
    }
  }

  const getItemsHandler = (page: number) => {
    return getItems({
      uid: firebaseData?.uid,
      filter: {
        status: filterByStatus,
        search: debouncedSearch,
        filter: {
          sortDate: filterMain?.sortDate || 'asc',
          languages: filterMain?.languages,
        },
      },
      limitCount: 10,
      page,
      lastVisible,
    })
  }

  // получение карточек для повторения
  const getItemsRepetition = () => {
    console.log('getItemsRepetition')

    setIsLoading(true)
    return getItems({
      uid: firebaseData?.uid,
      filter: {
        status: filterCardsModal.status,
        filter: {
          languages: filterCardsModal?.languages,
        },
      },
      limitCount: 10,
      page: page.current,
      lastVisible,
    })
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
      getItemsRepetition,
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
    getItemsRepetition,
  ])

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>
}

export const useCards = () => {
  return useContext(CardContext)
}
