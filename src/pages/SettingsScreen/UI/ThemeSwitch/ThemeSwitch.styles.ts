import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.size.s8,
  },
  title: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.palette.gray_text,
    fontFamily: theme.fonts.bold,
  },
  switcher: {
    flexDirection: 'row',
    gap: theme.size.s6,
    padding: theme.size.s4,
    borderRadius: theme.size.s16,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  option: {
    flex: 1,
    minHeight: theme.size.s44,
    borderRadius: theme.size.s12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.size.s12,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.transparent,
    backgroundColor: theme.colors.palette.transparent,
  },
  optionText: {
    fontSize: theme.fontSize.s14,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text.secondary,
  },
}))
