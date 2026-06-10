import type {RootParams} from './params'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootParams {}
  }
}

export {}
