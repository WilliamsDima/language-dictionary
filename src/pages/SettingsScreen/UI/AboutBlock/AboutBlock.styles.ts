
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    width: '100%',
    padding: theme.size.s18,
    borderRadius: theme.size.s24,
    backgroundColor: theme.colors.palette.card_alpha_90,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },

  item: {
    marginBottom: theme.size.s14,
    width: '100%',
  },

  blockName: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: theme.fontSize.s16,
    color: theme.colors.palette.white,
    marginBottom: theme.size.s5,
    fontWeight: '700',
    fontFamily: 'Mulish-Bold',
    variants: {
      isAppName: {
        true: {
          color: theme.colors.palette.primery,
        },
      },
    },
  },

  textBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.palette.gray_text,
    lineHeight: theme.fontSize.s20,
    variants: {
      isAppName: {
        true: {
          color: theme.colors.palette.primery,
        },
      },
    },
  },

  punktsBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  punkt: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.palette.gray_text,
    marginVertical: theme.size.s5,
  },
}))