import { COLORS } from '@/assets/styles/colors'
import {
  height,
  scaleFontSize,
  scaleWidth,
  width,
} from '@/shared/helpers/ScaleUtils'
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: scaleFontSize(14),
    color: COLORS.gray_text,
  },

  loader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    zIndex: 10,
  },
  animLoader: {
    width: scaleWidth(150),
    height: scaleWidth(150),
  },
})
