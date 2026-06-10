import {createNavigationContainerRef} from '@react-navigation/native'
import type {RootParams} from './params'

export const navigationRef = createNavigationContainerRef<RootParams>()

type Args<Name extends keyof RootParams> = undefined extends RootParams[Name]
  ? [name: Name] | [name: Name, params: RootParams[Name]]
  : [name: Name, params: RootParams[Name]]

export function navigate<Name extends keyof RootParams>(...args: Args<Name>) {
  if (!navigationRef.isReady()) {
    return
  }

  ;(navigationRef.navigate as (...input: unknown[]) => void)(...args)
}
