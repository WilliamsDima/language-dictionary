
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    position: 'relative',
  },
  wrapperInput: {
    position: 'relative',
  },
  title: {
    color: theme.colors.palette.gray_text,
    fontSize: theme.fontSize.s14,
    fontWeight: '700',
    marginBottom: theme.size.s8,
    fontFamily: 'Mulish-Bold',
  },

  input: {
    height: theme.size.s50,
    fontSize: theme.fontSize.s15,
    color: theme.colors.palette.white,
    textDecorationColor: 'transparent',
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    borderRadius: theme.size.s16,
    paddingHorizontal: theme.size.s18,
    backgroundColor: theme.colors.palette.card_alpha_92,
    fontFamily: 'Mulish-SemiBold',
    variants: {
      hasRightIcon: {
        true: {
          paddingRight: theme.size.s48,
        },
      },
      focus: {
        true: {
          borderColor: theme.colors.palette.primery,
          borderWidth: theme.size.s1,
          backgroundColor: theme.colors.palette.surface_light,
        },
      },
    },
  },

  rightIcon: {
    position: 'absolute',
    right: theme.size.s10,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    color: theme.colors.palette.dark_placeholder,
  },
}))