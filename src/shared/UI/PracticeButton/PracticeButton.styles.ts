import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  touch: {
    shadowColor: theme.colors.palette.gradient_gold,
    shadowOffset: {
      width: theme.size.s0,
      height: theme.size.s12,
    },
    shadowOpacity: theme.opacity.o35,
    shadowRadius: theme.size.s22,
    elevation: theme.size.s18,
  },
  button: {
    width: '100%',
    paddingHorizontal: theme.size.s20,
    paddingVertical: theme.size.s12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.white_alpha_06,
  },
  title: {
    color: theme.colors.palette.black,
    fontSize: theme.fontSize.s18,
    fontFamily: theme.fonts.extraBold,
  },
}))
