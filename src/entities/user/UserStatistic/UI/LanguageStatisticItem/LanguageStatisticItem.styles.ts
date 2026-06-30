
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  itemLang: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: theme.fontSize.s16,
    marginRight: theme.size.s4,
  },
  languagesText: {
    color: theme.colors.palette.primery,
  },
}))