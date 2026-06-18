export const RoutesNames = {
  start: 'start',
  auth: 'auth',
  splash: 'splash',
  mainStack: 'mainStack',
  main: 'main',
  settingsStack: 'settingsStack',
  settings: 'settings',
  profileStack: 'profileStack',
  profile: 'profile',
  achievements: 'achievements',
  cardsRepetition: 'cardsRepetition',
} as const

export type RouteName = (typeof RoutesNames)[keyof typeof RoutesNames]

export type TabsKeys =
  | typeof RoutesNames.mainStack
  | typeof RoutesNames.settingsStack
  | typeof RoutesNames.profileStack

export type RoutesTitle = RouteName
