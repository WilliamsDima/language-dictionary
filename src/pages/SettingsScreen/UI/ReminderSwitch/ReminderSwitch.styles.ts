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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.size.s12,
    minHeight: theme.size.s44,
    paddingVertical: theme.size.s8,
    paddingHorizontal: theme.size.s12,
    borderRadius: theme.size.s16,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  text: {
    flex: 1,
    fontSize: theme.fontSize.s14,
    color: theme.colors.text.secondary,
  },
}))
