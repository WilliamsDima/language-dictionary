
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  screen: {
    paddingHorizontal: theme.layout.appPadding,
    position: 'relative',
    justifyContent: 'flex-start',
    paddingTop: theme.size.s12,
    paddingBottom: theme.size.s24,
  },
  hero: {
    marginBottom: theme.size.s12,
    borderRadius: theme.size.s22,
    padding: theme.size.s14,
    backgroundColor: theme.colors.palette.card_alpha_92,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroCopy: {
    flex: 1,
    paddingRight: theme.size.s12,
  },
  heroKicker: {
    fontSize: theme.fontSize.s10,
    color: theme.colors.palette.primery,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-Bold',
    marginBottom: theme.size.s8,
  },
  heroTitle: {
    fontSize: theme.fontSize.s18,
    fontFamily: 'Mulish-ExtraBold',
  },
  heroPlaceholder: {
    width: theme.size.s68,
    height: theme.size.s68,
    borderRadius: theme.size.s18,
    borderWidth: theme.size.s2,
    borderColor: theme.colors.palette.red_placeholder,
    backgroundColor: theme.colors.palette.danger_alpha_16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPlaceholderText: {
    color: theme.colors.palette.red_placeholder,
    fontSize: theme.fontSize.s10,
    fontFamily: 'Mulish-ExtraBold',
  },

  logout: {
    marginTop: theme.size.s14,
    padding: theme.size.s14,
    backgroundColor: theme.colors.palette.red,
    borderColor: theme.colors.palette.transparent,
  },

  repeatBtn: {
    marginTop: theme.size.s14,
    padding: theme.size.s14,
    backgroundColor: theme.colors.palette.primery,
    borderColor: theme.colors.palette.transparent,
  },

  repeatText: {
    fontSize: theme.fontSize.s13,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-ExtraBold',
    color: theme.colors.palette.black,
  },
  dangerText: {
    fontSize: theme.fontSize.s13,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-ExtraBold',
    color: theme.colors.palette.white,
  },
  deleteText: {
    fontSize: theme.fontSize.s13,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-ExtraBold',
    color: theme.colors.palette.red,
  },

  delete: {
    marginTop: theme.size.s14,
    padding: theme.size.s14,
    borderColor: theme.colors.palette.red,
  },
}))