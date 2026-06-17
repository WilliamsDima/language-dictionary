
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  item: {
    width: '100%',
    borderBottomWidth: theme.size.s1,
    borderBottomColor: theme.colors.palette.dark_placeholder,
    paddingBottom: theme.size.s5,
    variants: {
      isLast: {
        true: {
          borderBottomWidth: theme.size.s0,
          paddingBottom: theme.size.s0,
        },
      },
    },
  },
  wordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  index: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.palette.primery,
    marginBottom: theme.size.s5,
  },
  word: {
    fontSize: theme.fontSize.s16,
    color: theme.colors.palette.white,
  },
}))