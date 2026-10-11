import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    marginTop: theme.size.s30,
    padding: theme.size.s18,
    borderRadius: theme.size.s24,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },

  title: {
    fontSize: theme.fontSize.s16,
    color: theme.colors.text.primary,
    fontWeight: '700',
    fontFamily: 'Mulish-Bold',
  },
  subtitle: {
    fontSize: theme.fontSize.s16,
    color: theme.colors.text.primary,
    marginTop: theme.size.s20,
    marginBottom: theme.size.s10,
    fontFamily: 'Mulish-Bold',
  },
}))
