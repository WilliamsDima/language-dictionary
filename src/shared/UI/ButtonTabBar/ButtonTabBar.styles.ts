
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  button: {
    minWidth: theme.size.s80,
    minHeight: theme.size.s50,
    paddingHorizontal: theme.size.s10,
    paddingVertical: theme.size.s6,
    borderRadius: theme.size.s18,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      isFocused: {
        true: {
          backgroundColor: theme.colors.palette.success_alpha_16,
          borderWidth: theme.size.s1,
          borderColor: theme.colors.palette.success_alpha_34,
        },
      },
    },
  },

  title: {
    fontSize: theme.fontSize.s10,
    marginTop: theme.size.s4,
    textAlign: 'center',
    color: theme.colors.palette.gray_text,
    variants: {
      isFocused: {
        true: {
          color: theme.colors.palette.white,
        },
      },
    },
  },
}))