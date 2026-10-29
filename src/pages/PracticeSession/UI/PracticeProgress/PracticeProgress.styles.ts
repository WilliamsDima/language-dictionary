import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    width: '100%',
    gap: theme.size.s10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counter: {
    paddingHorizontal: theme.size.s14,
    paddingVertical: theme.size.s8,
    borderRadius: theme.size.s999,
    backgroundColor: theme.colors.palette.card_alpha_88,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  counterText: {
    fontSize: theme.fontSize.s14,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  finish: {
    fontSize: theme.fontSize.s14,
    fontFamily: theme.fonts.bold,
    textTransform: 'uppercase',
    color: theme.colors.text.secondary,
  },
  track: {
    width: '100%',
    height: theme.size.s6,
    borderRadius: theme.size.s999,
    overflow: 'hidden',
    backgroundColor: theme.colors.palette.white_alpha_06,
  },
  fill: {
    height: '100%',
    borderRadius: theme.size.s999,
    backgroundColor: theme.colors.palette.primery,
  },
}))
