import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tooltip: {
    backgroundColor: COLORS.white,
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleWidth(10),
    borderRadius: scaleWidth(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  path: {
    fontSize: scaleFontSize(10),
    color: COLORS.black,
  },
})
