export type TabsKeys = 'mainStack'

export enum RoutesNames {
  // start stack
  start = 'start',
  auth = 'auth',

  // tabs stacks
  mainStack = 'mainStack',
  main = 'main',

  settingsStack = 'settingsStack',
  settings = 'settings',

  profileStack = 'profileStack',
  profile = 'profile',
}

let RoutesKeys: keyof typeof RoutesNames
export type RoutesTitle = typeof RoutesKeys
