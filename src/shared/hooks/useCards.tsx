import {
  useAddItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
  useUpdateItemStatusMutation,
} from '@/pages/MainScreen/api/cardsServices'
import { useAppSelector } from './useStore'
import { IItem } from '@/entities/Item/model/item'
import { useActions } from './useActions'
import ItemTooltip from '../UI/Tooltips/ItemTooltip/ItemTooltip'
import { Vibration } from 'react-native'
import { useUserActivity } from './useUserActivity'

export const useCards = () => {
  const { setTooltip } = useActions()

  const { isAuth } = useAppSelector((store) => store.app)

  const { updateActivity } = useUserActivity()

  const [addItemAPI] = useAddItemMutation()
  const [updateItem] = useUpdateItemMutation()
  const [updateItemStatus] = useUpdateItemStatusMutation()
  const [deleteItem] = useDeleteItemMutation()

  // обновление карточки
  const updateItemHandler = async (itemEdit: IItem) => {
    try {
      if (isAuth && itemEdit) {
        await updateItem({
          idDoc: itemEdit?.idDoc!,
          updatedData: itemEdit,
        }).unwrap()

        setTooltip({
          children: <ItemTooltip type="UPDATE" />,
          time: 3000,
        })
      }
    } catch (error) {
      setTooltip({ children: <ItemTooltip type="ERROR" />, time: 3000 })
    }
  }

  // добавление карточки
  const addItemHandler = async (item: IItem) => {
    if (isAuth && item) {
      try {
        await addItemAPI({ item }).unwrap()

        updateActivity({ addedCard: true })
        setTimeout(() => Vibration.vibrate(300), 300)
        setTooltip({
          children: <ItemTooltip type="ADD" />,
          time: 3000,
        })
      } catch (error) {
        setTooltip({ children: <ItemTooltip type="ERROR" />, time: 3000 })
      }
    }
  }

  // удаление карточки
  const deleteItemHandler = async (item: IItem) => {
    try {
      if (isAuth && item?.idDoc) {
        await deleteItem({
          idDoc: item.idDoc,
        }).unwrap()

        setTooltip({
          children: <ItemTooltip type="DELETE" />,
          time: 3000,
        })
      }
    } catch (error) {
      setTooltip({
        children: <ItemTooltip type="ERROR" />,
        time: 3000,
      })
    }
  }

  // изменение статуса карточки
  const updateStatusHandler = async (item: IItem, status: 'READY' | 'STUDY') => {
    try {
      if (isAuth && item?.idDoc) {
        await updateItemStatus({
          idDoc: item.idDoc,
          status,
        }).unwrap()
      }
    } catch (error) {
      setTooltip({ children: <ItemTooltip type="ERROR" />, time: 3000 })
    }
  }

  return {
    deleteItemHandler,
    addItemHandler,
    updateItemHandler,
    updateStatusHandler,
  }
}
