import { useMemo } from 'react'
import { useGetAchievementsQuery } from '@/shared/API/services/achievements/AchievementsQuery'
import { useAppSelector } from './useStore'

// единственная точка чтения достижений — экран достижений и превью в
// профиле переиспользуют один и тот же кэш-запрос; refetchOnFocus нужен,
// т.к. достижения открываются на бэкенде в фоне (после тренировки/
// добавления карточек), а не по действию на этом экране
export const useAchievements = () => {
  const { isAuth } = useAppSelector((store) => store.app)

  const { data, ...rest } = useGetAchievementsQuery(undefined, {
    skip: !isAuth,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  // намеренно не подставляем дефолтный пустой массив здесь: `undefined`
  // отличает "данные ещё не загружены" от "бэкенд вернул пустой список",
  // что важно для сравнения снимков и уведомлений о новых разблокировках
  const items = useMemo(() => data?.items, [data])

  return { ...rest, data: items }
}
