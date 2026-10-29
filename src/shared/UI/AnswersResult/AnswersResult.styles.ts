import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    gap: theme.size.s24,
  },

  success: {
    alignItems: 'center',
    gap: theme.size.s6,
  },
  successValue: {
    fontSize: theme.fontSize.s48,
    fontWeight: '700',
    color: theme.colors.palette.green,
  },
  successLabel: {
    fontSize: theme.fontSize.s14,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },

  stats: {
    flexDirection: 'row',
    width: '100%',
    gap: theme.size.s12,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.size.s20,
    borderRadius: theme.size.s24,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    gap: theme.size.s6,
  },
  statValueKnown: {
    fontSize: theme.fontSize.s34,
    fontWeight: '700',
    color: theme.colors.palette.green,
  },
  statValueUnknown: {
    fontSize: theme.fontSize.s34,
    fontWeight: '700',
    color: theme.colors.palette.red,
  },
  statLabel: {
    fontSize: theme.fontSize.s14,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
}))
