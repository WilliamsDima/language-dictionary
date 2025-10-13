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
    gap: 10,
    paddingHorizontal: 10,
  },
  title: {
    color: COLORS.white,
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: 25,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  emojy: {
    color: COLORS.gold,
    fontWeight: '800',
    fontSize: 30,
    fontStyle: 'normal',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 170,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  lottie: {
    width: 300,
    height: 300,
  },
  confetti: {
    width: 300,
    height: 300,
    position: 'absolute',
  },
  btnWrapper: {
    position: 'absolute',
    bottom: 70,
    width: '100%',
    paddingHorizontal: 50,
  },
  btn: {
    height: 50,
    width: '100%',
    backgroundColor: COLORS.live_color,
  },
  textBtn: {
    textTransform: 'uppercase',
    fontSize: 20,
  },
})
