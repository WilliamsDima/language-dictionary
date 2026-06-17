
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  itemText: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.palette.gray_text,
  },

  languages: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.size.s7,
    flexWrap: 'wrap',
  },
  languagesText: {
    color: theme.colors.palette.primery,
  },
  languagesTextEmpty: {
    color: theme.colors.palette.red,
  },
  editBtn: {
    marginLeft: theme.size.s5,
  },
}))