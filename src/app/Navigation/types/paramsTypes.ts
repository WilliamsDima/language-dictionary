import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RoutesNames } from '../RoutesNames'

export type AppNavigationParams = {
  [RoutesNames.auth]?: void
  [RoutesNames.main]?: void
  [RoutesNames.cardsRepetition]?: void
}

export type ScreensAppNavigation = keyof AppNavigationParams

export type NavigateStack = NativeStackNavigationProp<AppNavigationParams>
