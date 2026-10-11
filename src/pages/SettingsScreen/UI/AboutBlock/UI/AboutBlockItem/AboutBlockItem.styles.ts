import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
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
    color: theme.colors.text.primary,
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
