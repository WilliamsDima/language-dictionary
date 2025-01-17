import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  itemText: {
    fontSize: scaleFontSize(14),
    color: COLORS.gray_text,
  },

  languages: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(7),
    flexWrap: 'wrap',
  },
  languagesText: {
    color: COLORS.primery,
  },
  languagesTextEmpty: {
    color: COLORS.red,
  },
  editBtn: {
    marginLeft: scaleWidth(5),
  },
})
