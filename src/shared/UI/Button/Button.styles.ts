import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  button: {
    minHeight: theme.size.s48,
    paddingHorizontal: theme.size.s18,
    backgroundColor: theme.colors.background.surface,
    borderRadius: theme.size.s16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    overflow: 'hidden',
  },
  innerShadow: {
    position: 'absolute',
    bottom: theme.size.s0,
    left: theme.size.s0,
    right: theme.size.s0,
    height: theme.size.s18,
  },
  btnText: {
    color: theme.colors.text.primary,
    fontFamily: 'Mulish-Bold',
    fontSize: theme.fontSize.s14,
  },
  disabled: {
    opacity: theme.opacity.o45,
  },
  TRANSPARENT: {
    backgroundColor: theme.colors.palette.transparent,
    borderColor: theme.colors.palette.transparent,
  },
  ['TRANSPARENT-TEXT']: {
    color: theme.colors.palette.gray_text,
  },
  ['BORDER-TRANSPARENT']: {
    backgroundColor: theme.colors.palette.white_alpha_03,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  ['BORDER-TRANSPARENT-TEXT']: {
    color: theme.colors.text.primary,
  },
  PRIMERY: {
    backgroundColor: theme.colors.palette.primery,
    borderColor: theme.colors.palette.transparent,
  },
  ['PRIMERY-TEXT']: {
    color: theme.colors.base.black,
  },
}))
