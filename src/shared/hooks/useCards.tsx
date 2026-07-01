import {
  useAddItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
  useUpdateItemStatusMutation,
} from '@/pages/MainScreen/api/cardsServices'
import { useAppSelector } from './useStore'
import { IItem } from '@/entities/Item/model/item'
import { Vibration } from 'react-native'
import { useUserActivity } from './useUserActivity'
import { toast } from '@/shared/UI/Toast/toast'
import { useTranslation } from '@/shared/i18n/types'

export const useCards = () => {
  const { isAuth } = useAppSelector((store) => store.app)

  const [addItemAPI] = useAddItemMutation()
  const [updateItem] = useUpdateItemMutation()
  const [updateItemStatus] = useUpdateItemStatusMutation()
  const [deleteItem] = useDeleteItemMutation()

  const { updateActivity } = useUserActivity()

  const { t } = useTranslation()

  // обновление карточки
  const updateItemHandler = async (itemEdit: IItem) => {
    try {
      if (isAuth && itemEdit) {
        await updateItem({
          idDoc: itemEdit?.idDoc!,
          updatedData: itemEdit,
        }).unwrap()

        toast.success(t('itemTooltip.UPDATE'))
      }
    } catch (error) {
      toast.error(t('itemTooltip.ERROR'))
    }
  }

  // добавление карточки
  const addItemHandler = async (item: IItem) => {
    if (isAuth && item) {
      try {
        await addItemAPI({ item }).unwrap()

        updateActivity({ addedCard: true })
        setTimeout(() => Vibration.vibrate(300), 300)
        toast.success(t('itemTooltip.ADD'))
      } catch (error) {
        toast.error(t('itemTooltip.ERROR'))
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

        toast.success(t('itemTooltip.DELETE'))
      }
    } catch (error) {
      toast.error(t('itemTooltip.ERROR'))
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
      toast.error(t('itemTooltip.ERROR'))
    }
  }

  return {
    deleteItemHandler,
    addItemHandler,
    updateItemHandler,
    updateStatusHandler,
  }
}
