import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titles: {
    position: 'absolute',
    top: theme.size.s100,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.size.s10,
    paddingHorizontal: theme.size.s10,
  },
  title: {
    color: theme.colors.palette.white,
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: theme.fontSize.s25,
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
    bottom: theme.size.s170,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  lottie: {
    width: theme.size.s300,
    height: theme.size.s300,
  },
  confetti: {
    width: theme.size.s300,
    height: theme.size.s300,
    position: 'absolute',
  },
  btnWrapper: {
    position: 'absolute',
    bottom: theme.size.s70,
    width: '100%',
    paddingHorizontal: theme.size.s50,
  },
  btn: {
    height: theme.size.s50,
    width: '100%',
    backgroundColor: theme.colors.palette.live_color,
  },
  textBtn: {
    textTransform: 'uppercase',
    fontSize: theme.fontSize.s20,
  },
}))