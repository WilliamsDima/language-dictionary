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
    padding: scaleWidth(10),
    borderRadius: scaleWidth(5),
    backgroundColor: COLORS.green,
  },
  title: {
    color: COLORS.white,
    fontSize: scaleFontSize(16),
  },

  flag: {
    width: scaleWidth(25),
    height: scaleWidth(25),
    resizeMode: 'cover',
  },
})
