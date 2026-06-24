import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { useMemo } from 'react'
import { useUnistyles } from 'react-native-unistyles'

export const tabScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
}

export const rootStackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
}

export const hidenTabBarOption: BottomTabNavigationOptions = {
  tabBarStyle: { display: 'none' },
}

export const useStackScreenOptions = () => {
  const { theme } = useUnistyles()

  const nativeStackScreenOptions = useMemo<NativeStackNavigationOptions>(() => {
    return {
      headerStyle: {
        backgroundColor: theme.colors.background.surface,
      },
      headerTitleStyle: {
        color: theme.colors.text.primary,
      },
      headerTintColor: theme.colors.text.primary,
      headerShadowVisible: false,
      contentStyle: {
        backgroundColor: theme.colors.background.screen,
      },
    }
  }, [
    theme.colors.background.screen,
    theme.colors.background.surface,
    theme.colors.text.primary,
  ])

  const tabStackScreenOptions = useMemo<NativeStackNavigationOptions>(() => {
    return {
      ...nativeStackScreenOptions,
      headerShown: false,
    }
  }, [nativeStackScreenOptions])

  const startStackScreenOptions = useMemo<NativeStackNavigationOptions>(() => {
    return {
      ...tabStackScreenOptions,
      gestureEnabled: true,
    }
  }, [tabStackScreenOptions])

  const stackScreenOptions = useMemo<NativeStackNavigationOptions>(() => {
    return {
      ...nativeStackScreenOptions,
      animation: 'slide_from_left',
    }
  }, [nativeStackScreenOptions])

  return {
    nativeStackScreenOptions,
    tabStackScreenOptions,
    startStackScreenOptions,
    stackScreenOptions,
  }
}
