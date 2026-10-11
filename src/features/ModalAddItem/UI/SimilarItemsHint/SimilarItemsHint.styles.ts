import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    gap: theme.size.s6,
    paddingHorizontal: theme.size.s10,
    paddingVertical: theme.size.s8,
    borderRadius: theme.size.s12,
    backgroundColor: theme.colors.palette.white_alpha_04,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  label: {
    color: theme.colors.text.secondary,
    fontSize: theme.fontSize.s12,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme.size.s6,
  },
  rest: {
    color: theme.colors.text.secondary,
    fontSize: theme.fontSize.s12,
  },
}))
