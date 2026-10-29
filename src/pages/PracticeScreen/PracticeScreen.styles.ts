import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  screen: {
    paddingHorizontal: theme.layout.appPadding,
    paddingBottom: theme.size.s24,
    gap: theme.size.s12,
  },
  subtitle: {
    fontSize: theme.fontSize.s14,
    lineHeight: theme.lineHeights.md,
    color: theme.colors.text.secondary,
    marginBottom: theme.size.s4,
  },
}))
