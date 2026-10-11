import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  social: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.size.s5,
    paddingVertical: theme.size.s6,
  },
  socialIcon: {
    width: theme.size.s30,
    height: theme.size.s30,
    marginRight: theme.size.s5,
  },
  socialText: {
    fontSize: theme.fontSize.s15,
    color: theme.colors.palette.gray_text,
  },
}))
