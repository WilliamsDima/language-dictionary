import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    marginTop: scaleWidth(20),
  },

  statistic: {
    fontSize: scaleFontSize(16),
    color: COLORS.gray_text,
  },

  item: {
    marginVertical: scaleWidth(5),
  },
  itemText: {
    fontSize: scaleFontSize(14),
    color: COLORS.gray_text,
  },
})
