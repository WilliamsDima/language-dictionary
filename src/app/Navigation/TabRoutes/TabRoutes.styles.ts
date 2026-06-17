import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.palette.gray_bg,
  },
  shadowBand: {
    height: theme.size.s12,
  },
  tabsArea: {
    flex: 1,
    minHeight: 0,
  },
}))
