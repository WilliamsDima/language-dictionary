import { StyleSheet } from 'react-native-unistyles'

const sizes = {} as const

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const

const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 9999,
} as const

const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  xxxl: 32,
} as const

const lineHeights = {
  xs: 16,
  sm: 18,
  md: 20,
  lg: 24,
  xl: 28,
  xxl: 34,
} as const

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
} as const

const colorsLight = {
  base: {
    white: '#FFFFFF',
    black: '#000000',
  },
} as const

const colorsDark = colorsLight

const fonts = {} as const

const appThemes = {
  light: {
    colors: colorsLight,
    spacing,
    radius,
    fontSizes,
    lineHeights,
    iconSizes,
    fonts,
    sizes,
  },
  dark: {
    colors: colorsDark,
    spacing,
    radius,
    fontSizes,
    lineHeights,
    iconSizes,
    fonts,
    sizes,
  },
} as const

const breakpoints = {
  xs: 0,
  sm: 360,
  md: 768,
  lg: 1024,
} as const

export type AppThemes = typeof appThemes
export type AppBreakpoints = typeof breakpoints
export type AppThemeName = keyof AppThemes
export type AppTheme = AppThemes[AppThemeName]

declare module 'react-native-unistyles' {
  interface UnistylesThemes extends AppThemes {}
  interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  themes: appThemes,
  breakpoints,
  settings: {
    initialTheme: 'dark',
  },
})
