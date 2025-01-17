import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
    fontFamily: 'Mulish',
    fontSize: scaleFontSize(14),
    fontWeight: '500',
  },
})
