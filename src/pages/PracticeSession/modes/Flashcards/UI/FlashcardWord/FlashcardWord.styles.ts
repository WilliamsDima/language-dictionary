import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  word: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.size.s18,
    paddingHorizontal: theme.size.s10,
    backgroundColor: theme.colors.palette.white_alpha_04,
    borderRadius: theme.size.s6,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.white_alpha_06,
  },

  text: {
    color: theme.colors.text.primary,
    textAlign: 'center',
    fontSize: theme.fontSize.s24,
    fontWeight: '600',
    paddingBottom: theme.size.s5,
    fontFamily: theme.fonts.extraBold,
    variants: {
      isFlipped: {
        true: {
          color: theme.colors.palette.blue,
        },
      },
      // длинные фразы чуть мельче, чтобы реже переносились
      isLong: {
        true: {
          fontSize: theme.fontSize.s20,
        },
      },
    },
  },
}))
