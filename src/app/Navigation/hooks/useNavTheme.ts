import {
  DarkTheme,
  DefaultTheme,
  type Theme as NavTheme,
} from '@react-navigation/native'
import { useUnistyles } from 'react-native-unistyles'

export function useNavTheme(): NavTheme {
  const { theme, rt } = useUnistyles()

  const isDark = rt.themeName === 'dark'
  const baseTheme = isDark ? DarkTheme : DefaultTheme

  return {
    ...baseTheme,
    dark: isDark,
    colors: {
      ...baseTheme.colors,
      background: theme.colors.background.screen,
      card: theme.colors.background.surface,
      text: theme.colors.text.primary,
      border: theme.colors.border.default,
      primary: theme.colors.action.primary,
      notification: theme.colors.action.danger,
    },
  }
}
