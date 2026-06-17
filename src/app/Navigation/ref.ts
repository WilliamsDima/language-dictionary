import {createNavigationContainerRef} from '@react-navigation/native'
import type {AppRouteParams} from './params'

export const navigationRef = createNavigationContainerRef<AppRouteParams>()

type Args<Name extends keyof AppRouteParams> = undefined extends AppRouteParams[Name]
  ? [name: Name] | [name: Name, params: AppRouteParams[Name]]
  : [name: Name, params: AppRouteParams[Name]]

export function navigate<Name extends keyof AppRouteParams>(...args: Args<Name>) {
  if (!navigationRef.isReady()) {
    return
  }

  ;(navigationRef.navigate as (...input: unknown[]) => void)(...args)
}
