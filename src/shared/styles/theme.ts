import { LOCAL_KEYS } from '../constants/localStorage'
import { appStorage } from '../storage/mmkv.storage'
import { UnistylesRuntime } from 'react-native-unistyles'

export type ThemeApp = 'dark' | 'light'

const isThemeApp = (value: string): value is ThemeApp => {
  return value === 'dark' || value === 'light'
}

export const getSystemTheme = (): ThemeApp => {
  return UnistylesRuntime.colorScheme === 'light' ? 'light' : 'dark'
}

export const getStoredTheme = (): ThemeApp | null => {
  const value = appStorage.getString(LOCAL_KEYS.themeApp)

  return value && isThemeApp(value) ? value : null
}

export const getInitialTheme = (): ThemeApp => {
  return getStoredTheme() || getSystemTheme()
}

export const saveTheme = (theme: ThemeApp): void => {
  appStorage.setString(LOCAL_KEYS.themeApp, theme)
}

export const setAppTheme = (theme: ThemeApp): void => {
  saveTheme(theme)
  UnistylesRuntime.setTheme(theme)
}
