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
  },
  title: {
    color: theme.colors.palette.white,
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: theme.fontSize.s40,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  emojiLeft: {
    position: 'absolute',
    left: theme.size.s30,
    top: theme.size.s50,
    opacity: theme.opacity.o100,
    transform: [{ rotate: '-100deg' }],
    fontSize: theme.fontSize.s40,
  },
  emojiRight: {
    position: 'absolute',
    right: theme.size.s30,
    top: theme.size.s50,
    opacity: theme.opacity.o100,
    transform: [{ rotate: '10deg' }],
    fontSize: theme.fontSize.s40,
  },

  user: {
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    zIndex: 11,
    width: theme.size.s200,
    height: theme.size.s200,
    borderRadius: theme.size.s200 / 2,
    backgroundColor: theme.colors.palette.transparent,
  },
  image: {
    width: theme.size.s200,
    height: theme.size.s200,
    borderRadius: theme.size.s200 / 2,
  },
  fireworksWrapper: {
    position: 'absolute',
    width: '100%',
    left: theme.size.s0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  fireworks: {
    width: '100%',
    height: theme.size.s800,

    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    width: '100%',
    position: 'absolute',
    bottom: theme.size.s50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollLeft: {
    width: theme.size.s100,
    height: theme.size.s100,
    position: 'absolute',
    left: theme.size.s0,
    opacity: theme.opacity.o50,
  },
  scrollRight: {
    width: theme.size.s100,
    height: theme.size.s100,
    position: 'absolute',
    right: theme.size.s0,
    opacity: theme.opacity.o50,
  },
  years: {
    width: theme.size.s200,
    height: theme.size.s200,
  },
  welcome: {
    width: theme.size.s200,
    height: theme.size.s50,
  },
}))
