import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.size.s20,
    padding: theme.size.s18,
    borderRadius: theme.size.s24,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },

  version: {
    fontSize: theme.fontSize.s15,
    color: theme.colors.palette.gray_text,
    textAlign: 'center',
  },

  versionInvalid: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.palette.red,
    textAlign: 'center',
  },

  versionUpdate: {
    fontSize: theme.fontSize.s16,
    color: theme.colors.palette.primery,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: theme.size.s5,
  },
}))
