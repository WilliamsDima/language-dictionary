import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  inputs: {
    gap: theme.size.s10,
    paddingHorizontal: theme.size.s12,
    paddingVertical: theme.size.s14,
    backgroundColor: theme.colors.palette.white_alpha_015,
    borderRadius: theme.size.s18,
    marginBottom: theme.size.s10,
  },

  index: {
    color: theme.colors.palette.primery,
    textAlign: 'left',
    fontSize: theme.fontSize.s14,
    fontFamily: 'Mulish-ExtraBold',
  },
  input: {
    maxHeight: theme.size.s100,
    height: 'auto',
    backgroundColor: theme.colors.background.surface,
    color: theme.colors.text.primary,
  },

  footer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  deleteBtn: {
    width: theme.size.s40,
    height: theme.size.s40,
    borderRadius: theme.size.s20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.palette.danger_alpha_12,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.danger_alpha_24,
  },
}))
