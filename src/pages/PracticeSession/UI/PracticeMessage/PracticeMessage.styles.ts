import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.size.s20,
  },
  anim: {
    width: theme.size.s200,
    height: theme.size.s200,
  },
  text: {
    maxWidth: '85%',
    textAlign: 'center',
    fontSize: theme.fontSize.s16,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  btn: {
    minWidth: theme.size.s180,
    paddingVertical: theme.size.s16,
    backgroundColor: theme.colors.palette.primery,
    borderColor: theme.colors.palette.transparent,
  },
  btnText: {
    textTransform: 'uppercase',
    fontSize: theme.fontSize.s16,
    fontWeight: '600',
    color: theme.colors.base.black,
  },
}))
