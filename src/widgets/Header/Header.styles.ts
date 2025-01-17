import { COLORS } from '@/assets/styles/colors'
import {
  APP_PADDING,
  scaleFontSize,
  scaleWidth,
  width,
} from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const HEADER_HEIGHT = scaleWidth(50)

export const styles = StyleSheet.create({
  header: {
    paddingHorizontal: APP_PADDING,
    paddingVertical: scaleWidth(10),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    // top: IS_IOS ? HEADER_HEIGHT : 0,
    paddingTop: scaleWidth(10),
    // height: HEADER_HEIGHT,
    backgroundColor: COLORS.white,
    zIndex: 100,
    width: width,
  },
  h1: {
    color: COLORS.black,
    fontFamily: 'Mulish',
    fontWeight: '600',
    fontSize: scaleFontSize(24),
    marginRight: scaleWidth(20),
  },
  h2: {
    color: COLORS.black,
    fontFamily: 'Mulish',
    fontWeight: '700',
    fontSize: scaleFontSize(18),
    marginRight: scaleWidth(20),
  },

  backBtn: {
    marginRight: scaleWidth(20),
  },
})
