import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  pill: {
    paddingHorizontal: theme.size.s14,
    paddingVertical: theme.size.s8,
    borderRadius: theme.size.s999,
    backgroundColor: theme.colors.palette.card_alpha_88,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  text: {
    fontSize: theme.fontSize.s14,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  mistakesText: {
    fontSize: theme.fontSize.s14,
    fontWeight: '600',
    color: theme.colors.palette.red,
  },
}))
