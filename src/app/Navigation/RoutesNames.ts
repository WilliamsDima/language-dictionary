export type TabsKeys = 'mainStack'

export enum RoutesNames {
  // start stack
  start = 'start',
  auth = 'auth',
  splash = 'splash',

  // tabs stacks
  mainStack = 'mainStack',
  main = 'main',

  settingsStack = 'settingsStack',
  settings = 'settings',

  profileStack = 'profileStack',
  profile = 'profile',
  cardsRepetition = 'cardsRepetition',
}

let RoutesKeys: keyof typeof RoutesNames
export type RoutesTitle = typeof RoutesKeys
