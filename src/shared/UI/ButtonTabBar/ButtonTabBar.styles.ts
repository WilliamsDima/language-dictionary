import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: scaleFontSize(14),
    marginTop: scaleWidth(5),
    textAlign: 'center',
  },
  activeText: {
    color: COLORS.white,
  },
})
