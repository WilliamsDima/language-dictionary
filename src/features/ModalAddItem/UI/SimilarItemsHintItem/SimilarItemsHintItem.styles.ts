import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  chip: {
    maxWidth: '100%',
    paddingHorizontal: theme.size.s10,
    paddingVertical: theme.size.s4,
    borderRadius: theme.size.s12,
    backgroundColor: theme.colors.palette.success_alpha_12,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.success_alpha_34,
  },
  text: {
    color: theme.colors.text.primary,
    fontSize: theme.fontSize.s12,
  },
}))
