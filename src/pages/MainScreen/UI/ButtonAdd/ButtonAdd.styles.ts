import { COLORS } from '@/assets/styles/colors'
import { scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: scaleWidth(102),
    right: scaleWidth(10),
    zIndex: 50,
    width: scaleWidth(58),
    height: scaleWidth(58),
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
    width: scaleWidth(58),
    height: scaleWidth(58),
    borderRadius: scaleWidth(58 / 2),
    backgroundColor: 'rgba(124, 255, 107, 0.22)',
  },
  btn: {
    width: scaleWidth(58),
    height: scaleWidth(58),
    borderRadius: scaleWidth(58 / 2),
    backgroundColor: COLORS.primery,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primery,
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 16,
  },
})
