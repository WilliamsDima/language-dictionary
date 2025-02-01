import { useEffect } from 'react'
import { useActions } from './useActions'
import { useAppSelector } from './useStore'
import { useGetItemsQuery } from '@/pages/MainScreen/api/cardsServices'

export const useGetItems = () => {
  const { setItems } = useActions()

  const { isAuth } = useAppSelector((store) => store.app)
  const { firebaseData } = useAppSelector((store) => store.user)

  const { data } = useGetItemsQuery(
    {
      uid: firebaseData?.uid,
    },
    { skip: !firebaseData?.uid || !isAuth }
  )

  // сделать так чтоб работал только один раз, а все экшены добавить, удалить, редактировать, проверить можно ли сделать локально, вдруг когда добавляешь новый элемент в ответ приходит он и когда изменяешь, с удалением все проще, если будет вариант с тем что делать все локально то нужно массив элементов переделать в сторе на map, чтоб быстрее удалять и изменять, так как карточек можешь быть со свременем много
  useEffect(() => {
    if (isAuth && data) {
      setItems(data.items)
    }
  }, [isAuth, data])
}
