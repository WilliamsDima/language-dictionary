import {
  useAddItemMutation,
  useDeleteItemMutation,
  useLazyGetItemsQuery,
  useUpdateItemMutation,
} from '@/pages/MainScreen/api/cardsServices'
import { useAppSelector } from './useStore'
import { useMemo, useRef, useState } from 'react'
import { IItem } from '@/entities/Item/model/item'
import { useActions } from './useActions'
import ItemTooltip from '../UI/Tooltips/ItemTooltip/ItemTooltip'
import { Vibration } from 'react-native'

export const useCards = () => {
  const { addItemAC, deleteItemAC, updateItemAC, setTooltip } = useActions()

  const { firebaseData } = useAppSelector((store) => store.user)
  const { filterByStatus, search, filterMain, filterCardsModal, items } =
    useAppSelector((store) => store.items)

  const page = useRef<number>(1)

  const [allItems, setAllItems] = useState<IItem[]>([]) // для хранения всех элементов
  const [lastVisible, setLastVisible] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  // Локальное состояние для дебаунсированного поиска
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  //console.log(`allItems ${name}: `, allItems.length)

  const [getItems] = useLazyGetItemsQuery()
  const [addItemAPI] = useAddItemMutation()
  const [updateItem] = useUpdateItemMutation()
  const [deleteItem] = useDeleteItemMutation()

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
          sortDate: filterMain?.sortDate || 'asc',
          languages: filterMain?.languages,
        },
      },
      limitCount: 10,
      page,
      lastVisible,
    })
  }

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
          setTimeout(() => {
            Vibration.vibrate(300)
          }, 300)

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

  // получение карточек для повторения
  const getMoreItemsRepetition = () => {
    if (!firebaseData || isLoading || !lastVisible) return

    setIsLoading(true)
    getItems({
      uid: firebaseData?.uid,
      filter: {
        status: filterCardsModal.status,
        filter: {
          languages: filterCardsModal?.languages,
        },
      },
      limitCount: 10,
      page: page.current + 1,
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

  // получение карточек для повторения первый раз
  const getItemsRepetition = () => {
    setAllItems([])
    setLastVisible(null)

    setIsLoading(true)
    getItems({
      uid: firebaseData?.uid,
      filter: {
        status: filterCardsModal.status,
        filter: {
          languages: filterCardsModal?.languages,
        },
      },
      limitCount: 10,
      page: 1,
      lastVisible,
    })
      .then((res) => {
        if (res?.data?.items) {
          setLastVisible(res.data.lastVisible)
          setAllItems(res.data?.items)
        }
      })
      .finally(() => {
        setIsLoading(false)
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

  return {
    debouncedSearch,
    allItems,
    page,
    counts,
    isLoading,
    setDebouncedSearch,
    getItemsHandler,
    deleteItemHandler,
    addItemHandler,
    updateItemHandler,
    getMoreItemsRepetition,
    loadMoreItems,
    setIsLoading,
    setAllItems,
    setLastVisible,
    getItemsRepetition,
  }
}
