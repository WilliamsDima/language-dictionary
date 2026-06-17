import type {AppRouteParams} from './params'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRouteParams {}
  }
}

export {}
