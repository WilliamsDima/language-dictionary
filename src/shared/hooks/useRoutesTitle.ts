import { RoutesNames, RoutesTitle } from '@/app/Navigation/RoutesNames'
import { useMemo } from 'react'

export const useRoutesTitle = (title?: RoutesTitle) => {
  const titles: { [key in RoutesNames]?: any } = useMemo(() => {
    return {
      [RoutesNames.main]: 'main',
    }
  }, [title])

  return title && titles[title]
}
