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
    top: 50,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  title: {
    color: COLORS.white,
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: 30,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  count: {
    color: COLORS.gold,
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: 30,
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
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  lottie: {
    width: 400,
    height: 400,
  },
})
