import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    marginTop: theme.size.s4,
  },
  btn: {
    backgroundColor: theme.colors.palette.success_alpha_14,
    borderColor: theme.colors.palette.success_alpha_34,
    borderRadius: theme.size.s16,
  },
  btnText: {
    fontSize: theme.fontSize.s16,
    lineHeight: theme.lineHeights.md,
    color: theme.colors.palette.primery,
  },
}))
