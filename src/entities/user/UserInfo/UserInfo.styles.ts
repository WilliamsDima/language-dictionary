import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },

  avatar: {},

  info: {
    marginLeft: scaleWidth(10),
    marginTop: scaleWidth(10),
  },

  name: {
    fontSize: scaleFontSize(18),
    color: COLORS.white,
    marginBottom: scaleWidth(5),
  },
  date: {
    fontSize: scaleFontSize(14),
    color: COLORS.gray_text,
  },
})
