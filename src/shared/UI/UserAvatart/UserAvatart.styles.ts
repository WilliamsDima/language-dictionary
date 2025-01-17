import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    width: scaleWidth(95),
    height: scaleWidth(95),
    borderRadius: scaleWidth(95 / 2),
    backgroundColor: COLORS.dark_placeholder,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: scaleWidth(90),
    height: scaleWidth(90),
    borderRadius: scaleWidth(90 / 2),
    resizeMode: 'cover',
  },

  name: {
    fontSize: scaleFontSize(30),
    textTransform: 'uppercase',
    fontWeight: '600',
  },
})
