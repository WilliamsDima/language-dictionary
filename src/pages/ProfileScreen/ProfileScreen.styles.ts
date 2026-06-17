
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  screen: {
    paddingHorizontal: theme.layout.appPadding,
    position: 'relative',
    justifyContent: 'flex-start',
    paddingBottom: theme.size.s24,
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
