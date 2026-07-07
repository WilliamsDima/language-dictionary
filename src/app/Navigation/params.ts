import { RoutesNames } from './RoutesNames'
import type { CardDTO } from '@/pages/MainScreen/api/types'

export type StartStackParams = {
  [RoutesNames.auth]: undefined
  [RoutesNames.splash]: undefined
}

// undefined — обычный вход в практику по текущему фильтру списка (как сегодня),
// { mode: 'daily', cards } — вход из баннера серии с уже готовым набором карточек
export type CardsRepetitionParams =
  | { mode: 'daily'; cards: CardDTO[] }
  | undefined

export type MainStackParams = {
  [RoutesNames.splash]: undefined
  [RoutesNames.main]: undefined
  [RoutesNames.cardsRepetition]: CardsRepetitionParams
}

export type SettingsStackParams = {
  [RoutesNames.settings]: undefined
  [RoutesNames.cardsRepetition]: CardsRepetitionParams
}

export type ProfileStackParams = {
  [RoutesNames.profile]: undefined
  [RoutesNames.achievements]: undefined
  [RoutesNames.cardsRepetition]: CardsRepetitionParams
}

export type TabParamsList = {
  [RoutesNames.mainStack]: undefined
  [RoutesNames.settingsStack]: undefined
  [RoutesNames.profileStack]: undefined
}

export type AppRouteParams = StartStackParams &
  MainStackParams &
  SettingsStackParams &
  ProfileStackParams &
  TabParamsList & {
    [RoutesNames.start]: undefined
  }

export type RootStackParams = {
  [RoutesNames.start]: undefined
}
