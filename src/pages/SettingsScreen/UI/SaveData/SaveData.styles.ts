
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    marginTop: theme.size.s20,
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.size.s10,
  },
  btnText: {
    flex: 1,
    fontSize: theme.fontSize.s16,
    color: theme.colors.palette.primery,
  },
  saveData: {
    fontSize: theme.fontSize.s13,
    color: theme.colors.palette.gray_text,
    marginTop: theme.size.s5,
  },
}))