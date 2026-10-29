import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme, rt) => ({
  wrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.layout.appPadding,
    paddingBottom: rt.insets.bottom + theme.size.s12,
    gap: theme.size.s24,
  },

  title: {
    textAlign: 'center',
    fontSize: theme.fontSize.s24,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },

  hint: {
    textAlign: 'center',
    fontSize: theme.fontSize.s16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },

  error: {
    textAlign: 'center',
    fontSize: theme.fontSize.s14,
    fontWeight: '600',
    color: theme.colors.palette.red,
  },

  btn: {
    minWidth: theme.size.s180,
    paddingVertical: theme.size.s16,
    backgroundColor: theme.colors.palette.primery,
    borderColor: theme.colors.palette.transparent,
  },
  textBtn: {
    textTransform: 'uppercase',
    fontSize: theme.fontSize.s16,
    fontWeight: '600',
    color: theme.colors.base.black,
  },
}))
