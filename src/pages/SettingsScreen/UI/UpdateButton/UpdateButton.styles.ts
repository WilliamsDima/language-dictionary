import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    marginTop: scaleWidth(20),
  },
  btn: {
    padding: scaleWidth(10),
    backgroundColor: COLORS.primery,
  },
  btnText: {
    fontSize: scaleFontSize(16),
    color: COLORS.white,
  },
})
