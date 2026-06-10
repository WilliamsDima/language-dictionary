import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    width: scaleWidth(82),
    height: scaleWidth(82),
    borderRadius: scaleWidth(82 / 2),
    backgroundColor: COLORS.surface_light,
    borderWidth: 3,
    borderColor: 'rgba(124, 255, 107, 0.34)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: scaleWidth(76),
    height: scaleWidth(76),
    borderRadius: scaleWidth(76 / 2),
    resizeMode: 'cover',
  },

  name: {
    fontSize: scaleFontSize(24),
    textTransform: 'uppercase',
    fontWeight: '600',
    color: COLORS.white,
  },
})
