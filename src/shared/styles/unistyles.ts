import { StyleSheet } from 'react-native-unistyles'
import { COLORS } from '@/assets/styles/colors'

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
  xxl: 32,
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

const fonts = {
  regular: 'Mulish',
  medium: 'Mulish-Medium',
  semibold: 'Mulish-SemiBold',
  bold: 'Mulish-Bold',
  light: 'Mulish-Light',
} as const

const colorsLight = {
  background: {
    screen: '#F4FBFF',
    surface: COLORS.white,
    input: '#E6F0FA',
    inverse: COLORS.gray_bg,
  },
  text: {
    primary: COLORS.black,
    secondary: '#51637D',
    placeholder: COLORS.dark_placeholder,
    inverse: COLORS.white,
  },
  action: {
    primary: COLORS.primery,
    success: COLORS.green,
    danger: COLORS.red,
    info: COLORS.blue,
  },
  border: {
    default: '#D7E5F2',
    muted: '#A5B8CF',
  },
  overlay: {
    modal: COLORS.bg_modal,
    modalLight: COLORS.bg_modal_light,
  },
  tabBar: {
    background: COLORS.white,
    shadow: '#D7E5F2',
  },
  item: {
    default: COLORS.item,
    study: COLORS.item_study,
    ready: COLORS.item_ready,
  },
  icon: {
    primary: COLORS.black,
    inverse: COLORS.white,
  },
  base: {
    white: COLORS.white,
    black: COLORS.black,
    gold: COLORS.gold,
  },
} as const

const colorsDark = {
  background: {
    screen: COLORS.gray_bg,
    surface: COLORS.surface,
    input: COLORS.gray_bg_btn,
    inverse: COLORS.white,
  },
  text: {
    primary: COLORS.white,
    secondary: COLORS.gray_text,
    placeholder: COLORS.dark_placeholder,
    inverse: COLORS.black,
  },
  action: {
    primary: COLORS.primery,
    success: COLORS.green,
    danger: COLORS.red,
    info: COLORS.blue,
  },
  border: {
    default: COLORS.border,
    muted: 'rgba(168, 186, 212, 0.24)',
  },
  overlay: {
    modal: COLORS.bg_modal,
    modalLight: COLORS.bg_modal_light,
  },
  tabBar: {
    background: COLORS.tab_bar_dark,
    shadow: '#050B14',
  },
  item: {
    default: COLORS.item,
    study: COLORS.item_study,
    ready: COLORS.item_ready,
  },
  icon: {
    primary: COLORS.white,
    inverse: COLORS.black,
  },
  base: {
    white: COLORS.white,
    black: COLORS.black,
    gold: COLORS.gold,
  },
} as const

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
