import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { appThemes } from '@/shared/styles/unistyles'

export const nativeStackScreenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: appThemes.light.colors.palette.white,
  },
  headerShadowVisible: false,
}

export const tabScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
}

export const rootStackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
}

export const tabStackScreenOptions: NativeStackNavigationOptions = {
  ...nativeStackScreenOptions,
  headerShown: false,
}

export const startStackScreenOptions: NativeStackNavigationOptions = {
  ...tabStackScreenOptions,
  gestureEnabled: true,
}

export const hidenTabBarOption: BottomTabNavigationOptions = {
  tabBarStyle: { display: 'none' },
}

export const stackScreenOptions: NativeStackNavigationOptions = {
  ...nativeStackScreenOptions,
  animation: 'slide_from_left',
}
