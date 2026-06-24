import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titles: {
    position: 'absolute',
    top: theme.size.s50,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.size.s30,
  },
  title: {
    color: theme.colors.text.primary,
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: theme.fontSize.s30,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  emojy: {
    color: theme.colors.palette.gold,
    fontWeight: '800',
    fontSize: theme.fontSize.s30,
    fontStyle: 'normal',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: theme.size.s0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  lottie: {
    width: theme.size.s300,
    height: theme.size.s300,
  },
}))
