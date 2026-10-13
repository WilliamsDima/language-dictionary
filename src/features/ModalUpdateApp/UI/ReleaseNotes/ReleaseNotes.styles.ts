import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    marginTop: theme.size.s14,
    gap: theme.size.s6,
  },
  title: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.text.primary,
    fontFamily: 'Mulish-Bold',
  },
  item: {
    flexDirection: 'row',
    gap: theme.size.s8,
  },
  bullet: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.palette.primery,
  },
  text: {
    flex: 1,
    fontSize: theme.fontSize.s14,
    color: theme.colors.text.secondary,
  },
}))
