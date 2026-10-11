import { RoutesNames, RoutesTitle } from '@/app/Navigation/RoutesNames'
import { useMemo } from 'react'
import { useTranslation } from '@/shared/i18n/types'

export const useRoutesTitle = (title?: RoutesTitle) => {
  const { t } = useTranslation()

  const titles = useMemo<Partial<Record<RoutesTitle, string>>>(() => {
    return {
      [RoutesNames.main]: t('navigation.main'),
      [RoutesNames.settings]: t('navigation.settings'),
      [RoutesNames.profile]: t('navigation.profile'),
      [RoutesNames.cardsRepetition]: t('navigation.practice'),
      [RoutesNames.auth]: t('navigation.auth'),
    }
  }, [t])

  return title && titles[title]
}
