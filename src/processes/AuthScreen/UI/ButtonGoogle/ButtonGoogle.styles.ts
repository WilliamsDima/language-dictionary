
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  btn: {
    width: '100%',
    paddingVertical: theme.size.s16,
    alignItems: 'center',
    backgroundColor: theme.colors.palette.primery,
    borderColor: theme.colors.palette.transparent,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: theme.fontSize.s16,
    marginRight: theme.size.s15,
    color: theme.colors.palette.black,
    fontFamily: 'Mulish-ExtraBold',
  },
}))