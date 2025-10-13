import { COLORS } from '@/assets/styles/colors'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titles: {
    position: 'absolute',
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: 40,
    fontStyle: 'italic',
    textAlign: 'center',
  },

  user: {
    minWidth: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    zIndex: 11,
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: 'transparent',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
  },
  fireworksWrapper: {
    position: 'absolute',
    width: '100%',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  fireworks: {
    width: '100%',
    height: 800,

    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollLeft: {
    width: 100,
    height: 100,
    position: 'absolute',
    left: 0,
    opacity: 0.5,
  },
  scrollRight: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: 0,
    opacity: 0.5,
  },
  years: {
    width: 200,
    height: 200,
  },
  welcome: {
    width: 200,
    height: 50,
  },
})
