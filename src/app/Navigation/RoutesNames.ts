export type TabsKeys = 'mainStack'

export enum RoutesNames {
  // start stack
  start = 'start',
  auth = 'auth',

  // tabs stacks
  mainStack = 'mainStack',
  main = 'main',
}

let RoutesKeys: keyof typeof RoutesNames
export type RoutesTitle = typeof RoutesKeys
