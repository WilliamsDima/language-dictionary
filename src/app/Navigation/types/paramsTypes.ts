import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import type {AppRouteParams} from '../params'

export type ScreensAppNavigation = keyof AppRouteParams
export type NavigateStack = NativeStackNavigationProp<AppRouteParams>
