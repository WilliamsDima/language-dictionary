import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    width: '100%',
    padding: theme.size.s18,
    borderRadius: theme.size.s24,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
}))
