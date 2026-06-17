import { RoutesNames, RoutesTitle } from '@/app/Navigation/RoutesNames'
import { useMemo } from 'react'

export const useRoutesTitle = (title?: RoutesTitle) => {
  const titles = useMemo<Partial<Record<RoutesTitle, string>>>(() => {
    return {
      [RoutesNames.main]: 'Слова',
      [RoutesNames.settings]: 'Настройки',
      [RoutesNames.profile]: 'Профиль',
      [RoutesNames.cardsRepetition]: 'Практика',
      [RoutesNames.auth]: 'Вход',
    }
  }, [])

  return title && titles[title]
}
