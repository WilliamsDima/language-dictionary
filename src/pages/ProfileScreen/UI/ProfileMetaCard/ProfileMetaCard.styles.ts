import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  metaCard: {
    padding: theme.size.s16,
    borderRadius: theme.size.s20,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  metaLabel: {
    fontSize: theme.fontSize.s12,
    letterSpacing: theme.letterSpacing.s08,
    textTransform: 'uppercase',
    fontFamily: theme.fonts.bold,
    color: theme.colors.palette.gray_text,
  },
  metaValue: {
    marginTop: theme.size.s6,
    fontSize: theme.fontSize.s18,
    fontFamily: theme.fonts.extraBold,
    color: theme.colors.text.primary,
  },
}))
