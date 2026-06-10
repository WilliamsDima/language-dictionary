import { COLORS } from '@/assets/styles/colors'
import {
  APP_PADDING,
  scaleFontSize,
  scaleWidth,
  width,
} from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(14),
    paddingVertical: scaleWidth(12),
    borderRadius: scaleWidth(16),
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    color: COLORS.white,
    fontSize: scaleFontSize(14),
  },
  error: {
    color: COLORS.red,
    fontSize: scaleFontSize(12),
    marginTop: scaleWidth(6),
  },

  flag: {
    width: scaleWidth(25),
    height: scaleWidth(25),
    resizeMode: 'cover',
  },
})
