import { useCallback } from 'react'
import { useLazyGetDailyChallengeQuery } from '@/shared/API/services/streak/StreakQuery'
import { getLocalDateString } from '@/shared/helpers/localDate'
import { navigate } from '@/app/Navigation/ref'
import { RoutesNames } from '@/app/Navigation/RoutesNames'

// общий вход в ежедневное задание — переиспользуется бейджем и кнопкой
// «Практиковаться» (пока задание не пройдено, кнопка тоже открывает его)
export const useStartDailyChallenge = () => {
  const [fetchDailyChallenge] = useLazyGetDailyChallengeQuery()

  return useCallback(() => {
    fetchDailyChallenge(getLocalDateString())
      .unwrap()
      .then((result) => {
        navigate(RoutesNames.cardsRepetition, {
          mode: 'daily',
          cards: result.cards,
        })
      })
      .catch(() => {
        // сеть недоступна/ошибка запроса — остаёмся на текущем экране
      })
  }, [fetchDailyChallenge])
}
