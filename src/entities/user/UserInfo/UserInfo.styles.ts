
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.size.s14,
    borderRadius: theme.size.s20,
    backgroundColor: theme.colors.palette.card_alpha_90,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },

  avatar: {},

  info: {
    marginLeft: theme.size.s12,
    flex: 1,
  },

  name: {
    fontSize: theme.fontSize.s18,
    color: theme.colors.palette.white,
    marginBottom: theme.size.s4,
    fontFamily: 'Mulish-ExtraBold',
  },
  date: {
    fontSize: theme.fontSize.s12,
    color: theme.colors.palette.gray_text,
    lineHeight: theme.fontSize.s16,
  },
}))