import {
  useAddItemMutation,
  useDeleteItemMutation,
  useLazyGetItemsQuery,
  useUpdateItemMutation,
} from '@/pages/MainScreen/api/cardsServices'
import { useAppSelector } from './useStore'
import { useCallback, useMemo, useRef, useState } from 'react'
import { IItem } from '@/entities/Item/model/item'
import { useActions } from './useActions'
import ItemTooltip from '../UI/Tooltips/ItemTooltip/ItemTooltip'
import { Vibration } from 'react-native'
import { useUserActivity } from './useUserActivity'

export const useCards = () => {
  const { addItemAC, deleteItemAC, updateItemAC, setTooltip } = useActions()

  const { firebaseData } = useAppSelector((store) => store.user)
  const { filterByStatus, search, filterMain, filterCardsModal, items } =
    useAppSelector((store) => store.items)

  const page = useRef<number>(1)

  const [allItems, setAllItems] = useState<Record<number, IItem> | null>(null) // для хранения всех элементов
  const [lastVisible, setLastVisible] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  // Локальное состояние для дебаунсированного поиска
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  const { updateActivity } = useUserActivity()

  const [getItems] = useLazyGetItemsQuery()
  const [addItemAPI] = useAddItemMutation()
  const [updateItem] = useUpdateItemMutation()
  const [deleteItem] = useDeleteItemMutation()

  const counts = useMemo(() => {
    const values = Object.values(items)
    return {
      ALL: values.length,
      READY: values.filter((it) => it.status === 'READY').length,
      STUDY: values.filter((it) => it.status === 'STUDY').length,
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
  const updateItemHandler = async (itemEdit: IItem) => {
    console.log('updateItemHandler itemEdit', itemEdit)
    try {
      if (firebaseData && itemEdit) {
        const res = await updateItem({
          uid: firebaseData.uid,
          idDoc: itemEdit?.idDoc!,
          updatedData: itemEdit,
        }).unwrap()

        console.log('updateItemHandler res', res)

        if (res) {
          updateItemAC(res)

          setAllItems((prev) => {
            const obj = {
              ...prev,
            }

            if (obj[itemEdit.id]) {
              obj[itemEdit.id] = res
            }

            return obj
          })

          setTooltip({
            children: <ItemTooltip type="UPDATE" />,
            time: 3000,
          })
        }
      }
    } catch (error) {
      console.log('updateItemHandler error', error)
      setTooltip({ children: <ItemTooltip type="ERROR" />, time: 3000 })
    }
  }

  // добавление карточки
  const addItemHandler = async (item: IItem) => {
    if (firebaseData && item) {
      try {
        const res = await addItemAPI({ item, uid: firebaseData.uid }).unwrap()

        console.log('addItemHandler res', res)

        if (res) {
          updateActivity({ addedCard: true })
          setAllItems((prev) => {
            const obj: Record<number, IItem> = {
              [res.id]: res,
              ...prev,
            }

            return obj
          })
          addItemAC(res)
          setTimeout(() => Vibration.vibrate(300), 300)
          setTooltip({
            children: <ItemTooltip type="ADD" />,
            time: 3000,
          })
        }
      } catch (error) {
        setTooltip({ children: <ItemTooltip type="ERROR" />, time: 3000 })
      }
    }
  }

  // удаление карточки
  const deleteItemHandler = async (item: IItem) => {
    console.log('deleteItemHandler item', item)

    try {
      if (firebaseData && item?.idDoc) {
        const res = await deleteItem({
          idDoc: item.idDoc,
          uid: firebaseData.uid,
        }).unwrap()

        console.log('deleteItemHandler res', res)

        if (res?.success) {
          setAllItems((prev) => {
            const obj = {
              ...prev,
            }

            if (obj[item.id]) {
              delete obj[item.id]
            }

            return obj
          })
          deleteItemAC(item)

          setTooltip({
            children: <ItemTooltip type="DELETE" />,
            time: 3000,
          })
        }
      }
    } catch (error) {
      setTooltip({
        children: <ItemTooltip type="ERROR" />,
        time: 3000,
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
            return {
              ...prevItems,
              ...res.data?.items!,
            }
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
    setAllItems({})
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

          if (res.data?.items) {
            const obj: Record<number, IItem> = {}

            res.data?.items.forEach((it) => {
              obj[it.id] = it
            })

            setAllItems(obj)
          }
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Функция для загрузки данных с пагинацией
  // Обрабатываем загрузку новых элементов при достижении конца списка
  const loadMoreItems = useCallback(() => {
    if (!firebaseData || isLoading || !lastVisible) return

    console.log('loadMoreItems')

    setIsLoading(true)

    getItemsHandler(page.current + 1)
      .then((res) => {
        if (res?.data?.items) {
          setLastVisible(res.data.lastVisible)

          setAllItems((prevItems) => {
            let obj: Record<number, IItem> = {}
            if (!!debouncedSearch) {
              const array = [
                ...Object.values(prevItems || {}),
                ...res.data?.items!,
              ]

              array.forEach((it) => {
                obj[it.id] = it
              })
            } else {
              obj = {
                ...prevItems,
                ...res.data?.items!,
              }
            }

            return obj
          })
        }
      })
      .finally(() => {
        setIsLoading(false)
        page.current = page.current + 1
      })
  }, [firebaseData, isLoading, lastVisible, debouncedSearch])

  return {
    debouncedSearch,
    allItems,
    page,
    counts,
    isLoading,
    firebaseData,
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
