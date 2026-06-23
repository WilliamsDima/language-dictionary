import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    marginBottom: theme.size.s20,
    padding: theme.size.s18,
    borderRadius: theme.size.s24,
    backgroundColor: theme.colors.palette.card_alpha_90,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    gap: theme.size.s12,
  },
}))
