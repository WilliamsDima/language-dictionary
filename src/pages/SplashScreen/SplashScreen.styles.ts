
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.palette.transparent,
  },
  title: {
    color: theme.colors.palette.white,
    fontSize: theme.size.s24,
    fontFamily: 'Mulish-ExtraBold',
    marginBottom: theme.size.s8,
  },
  subtitle: {
    color: theme.colors.palette.gray_text,
    fontSize: theme.size.s14,
    textAlign: 'center',
    marginBottom: theme.size.s12,
    maxWidth: '74%',
  },

  words: {
    width: '50%',
    height: theme.size.s200,
  },
  planet: {
    width: '80%',
    height: theme.size.s300,
    marginTop: -50,
  },
}))