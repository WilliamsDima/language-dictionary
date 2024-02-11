import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RoutesNames } from '../RoutesNames'

export type AppNavigationParams = {
  [RoutesNames.auth]?: undefined
  [RoutesNames.main]?: undefined
}

export type ScreensAppNavigation = keyof AppNavigationParams

export type NavigateStack = NativeStackNavigationProp<AppNavigationParams>
