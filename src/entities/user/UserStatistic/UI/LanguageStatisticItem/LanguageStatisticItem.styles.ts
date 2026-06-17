
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  itemLang: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: theme.size.s15,
    height: theme.size.s15,
    resizeMode: 'cover',
    marginRight: theme.size.s3,
  },
  languagesText: {
    color: theme.colors.palette.primery,
  },
}))