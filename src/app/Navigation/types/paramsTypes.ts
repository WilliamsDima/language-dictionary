import type {StackNavigationProp} from '@react-navigation/stack'
import type {RootParams} from '../params'

export type ScreensAppNavigation = keyof RootParams
export type NavigateStack = StackNavigationProp<RootParams>
