import { RoutesNames } from './RoutesNames'

export type StartStackParams = {
  [RoutesNames.auth]: undefined
  [RoutesNames.splash]: undefined
}

export type MainStackParams = {
  [RoutesNames.splash]: undefined
  [RoutesNames.main]: undefined
  [RoutesNames.cardsRepetition]: undefined
}

export type SettingsStackParams = {
  [RoutesNames.settings]: undefined
  [RoutesNames.cardsRepetition]: undefined
}

export type ProfileStackParams = {
  [RoutesNames.profile]: undefined
  [RoutesNames.achievements]: undefined
  [RoutesNames.cardsRepetition]: undefined
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
