import { StyleSheet } from 'react-native-unistyles'

// плитки в стиле AnswersResult, но поменьше — второстепенная информация
export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    gap: theme.size.s12,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.size.s14,
    borderRadius: theme.size.s24,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    gap: theme.size.s6,
  },
  value: {
    fontSize: theme.fontSize.s24,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  label: {
    fontSize: theme.fontSize.s14,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
}))
