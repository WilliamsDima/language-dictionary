import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.size.s24,
  },

  title: {
    textAlign: 'center',
    fontSize: theme.fontSize.s24,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },

  btns: {
    flexDirection: 'row',
    width: '100%',
    gap: theme.size.s12,
  },
  again: {
    flex: 1,
    paddingVertical: theme.size.s16,
    borderColor: theme.colors.palette.border,
  },
  againText: {
    textTransform: 'uppercase',
    fontSize: theme.fontSize.s16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  finish: {
    flex: 1,
    paddingVertical: theme.size.s16,
    backgroundColor: theme.colors.palette.primery,
    borderColor: theme.colors.palette.transparent,
  },
  finishText: {
    textTransform: 'uppercase',
    fontSize: theme.fontSize.s16,
    fontWeight: '600',
    color: theme.colors.base.black,
  },
}))
