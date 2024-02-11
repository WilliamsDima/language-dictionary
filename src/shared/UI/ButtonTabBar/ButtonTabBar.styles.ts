import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: COLORS.white,
    fontSize: scaleFontSize(12),
    fontWeight: '600',
    fontFamily: 'Mulish',
  },
  activeText: {
    color: COLORS.white,
  },
})
