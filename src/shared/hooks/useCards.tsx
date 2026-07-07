import {
  cardsServices,
  useAddItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
  useUpdateItemStatusMutation,
} from '@/pages/MainScreen/api/cardsServices'
import { useAppDispatch, useAppSelector } from './useStore'
import { store } from '@/shared/store/store'
import { IItem } from '@/entities/Item/model/item'
import { Vibration } from 'react-native'
import { toast } from '@/shared/UI/Toast/toast'
import { useTranslation } from '@/shared/i18n/types'

// бэкенд отвечает 404, когда карточка уже удалена (например, с другого устройства),
// а локальный кэш ещё не успел об этом узнать
const isNotFoundError = (error: unknown): boolean =>
  typeof error === 'object' &&
  error !== null &&
  'status' in error &&
  (error as { status?: unknown }).status === 404

export const useCards = () => {
  const dispatch = useAppDispatch()

  const { isAuth } = useAppSelector((state) => state.app)

  const [addItemAPI] = useAddItemMutation()
  const [updateItem] = useUpdateItemMutation()
  const [updateItemStatus] = useUpdateItemStatusMutation()
  const [deleteItem] = useDeleteItemMutation()

  const { t } = useTranslation()

  // убираем из локального кэша карточку, которую бэкенд больше не знает
  const dropStaleItem = (cardId: number) => {
    const cachedArgs = cardsServices.util.selectCachedArgsForQuery(
      store.getState(),
      'getItems'
    )

    cachedArgs.forEach((args) => {
      dispatch(
        cardsServices.util.updateQueryData('getItems', args, (draft) => {
          const index = draft.items.findIndex((it) => it.id === cardId)
          if (index === -1) return
          draft.items.splice(index, 1)
          draft.total -= 1
        })
      )
    })
  }

  // обновление карточки
  const updateItemHandler = async (itemEdit: IItem) => {
    try {
      if (isAuth && itemEdit) {
        await updateItem({
          id: itemEdit.id,
          updatedData: itemEdit,
        }).unwrap()

        toast.success(t('itemTooltip.UPDATE'))
      }
    } catch (error) {
      console.error('[useCards] updateItemHandler error', error)

      if (isNotFoundError(error)) {
        dropStaleItem(itemEdit.id)
        toast.error(t('itemTooltip.NOT_FOUND'))
        return
      }

      toast.error(t('itemTooltip.ERROR'))
    }
  }

  // добавление карточки
  const addItemHandler = async (item: IItem) => {
    if (isAuth && item) {
      try {
        await addItemAPI({ item }).unwrap()

        setTimeout(() => Vibration.vibrate(300), 300)
        toast.success(t('itemTooltip.ADD'))
      } catch (error) {
        console.error('[useCards] addItemHandler error', error)
        toast.error(t('itemTooltip.ERROR'))
      }
    }
  }

  // удаление карточки
  const deleteItemHandler = async (item: IItem) => {
    try {
      if (isAuth && item?.id) {
        await deleteItem({
          id: item.id,
        }).unwrap()

        toast.success(t('itemTooltip.DELETE'))
      }
    } catch (error) {
      console.error('[useCards] deleteItemHandler error', error)
      toast.error(t('itemTooltip.ERROR'))
    }
  }

  // изменение статуса карточки
  const updateStatusHandler = async (item: IItem, status: 'READY' | 'STUDY') => {
    try {
      if (isAuth && item?.id) {
        await updateItemStatus({
          id: item.id,
          status,
        }).unwrap()
      }
    } catch (error) {
      console.error('[useCards] updateStatusHandler error', error)

      if (isNotFoundError(error)) {
        dropStaleItem(item.id)
        toast.error(t('itemTooltip.NOT_FOUND'))
        return
      }

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
