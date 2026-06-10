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
    padding: scaleWidth(14),
    borderRadius: scaleWidth(20),
    backgroundColor: 'rgba(17, 39, 65, 0.9)',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  statistic: {
    fontSize: scaleFontSize(13),
    color: COLORS.primery,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-Bold',
    marginBottom: scaleWidth(8),
  },

  item: {
    marginVertical: scaleWidth(4),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleWidth(6),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  itemText: {
    fontSize: scaleFontSize(13),
    color: COLORS.white,
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
