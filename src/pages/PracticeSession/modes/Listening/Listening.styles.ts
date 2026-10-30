import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flex: 1,
    width: '100%',
    gap: theme.size.s14,
  },

  card: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.size.s14,
    padding: theme.size.s14,
    backgroundColor: theme.colors.background.surface,
    borderRadius: theme.size.s28,
    borderWidth: theme.size.s2,
    borderColor: theme.colors.palette.border,
  },

  soundBtn: {
    width: theme.size.s96,
    height: theme.size.s96,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.size.s10,
    borderRadius: theme.size.s28,
  },

  prompt: {
    textAlign: 'center',
    color: theme.colors.palette.gray_text,
    fontSize: theme.fontSize.s16,
    fontWeight: '600',
  },
  word: {
    textAlign: 'center',
    color: theme.colors.text.primary,
    fontSize: theme.fontSize.s30,
    fontWeight: '700',
  },
  speechHint: {
    textAlign: 'center',
    color: theme.colors.palette.red,
    fontSize: theme.fontSize.s14,
    fontWeight: '600',
  },

  options: {
    width: '100%',
    gap: theme.size.s10,
  },

  footer: {
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    minWidth: theme.size.s176,
    paddingVertical: theme.size.s16,
    backgroundColor: theme.colors.background.input,
  },
  btnText: {
    textAlign: 'center',
    fontSize: theme.fontSize.s16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
}))
