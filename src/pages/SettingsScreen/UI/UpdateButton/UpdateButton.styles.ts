
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    marginTop: theme.size.s20,
  },
  btn: {
    padding: theme.size.s10,
    backgroundColor: theme.colors.palette.primery,
  },
  btnText: {
    fontSize: theme.fontSize.s16,
    color: theme.colors.palette.white,
  },
}))