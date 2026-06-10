import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaleWidth(14),
    borderRadius: scaleWidth(20),
    backgroundColor: 'rgba(17, 39, 65, 0.9)',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  avatar: {},

  info: {
    marginLeft: scaleWidth(12),
    flex: 1,
  },

  name: {
    fontSize: scaleFontSize(18),
    color: COLORS.white,
    marginBottom: scaleWidth(4),
    fontFamily: 'Mulish-ExtraBold',
  },
  date: {
    fontSize: scaleFontSize(12),
    color: COLORS.gray_text,
    lineHeight: scaleFontSize(16),
  },
})
