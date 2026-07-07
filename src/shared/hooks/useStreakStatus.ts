import { useGetStreakStatusQuery } from '@/shared/API/services/streak/StreakQuery'
import { getLocalDateString } from '@/shared/helpers/localDate'
import { useAppSelector } from './useStore'

// единственная точка чтения статуса серии — баннер, плитка в профиле и
// триггер модалки успеха переиспользуют один и тот же кэш-запрос
export const useStreakStatus = () => {
  const { isAuth } = useAppSelector((store) => store.app)

  return useGetStreakStatusQuery(getLocalDateString(), {
    skip: !isAuth,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })
}
