import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: {
    paddingHorizontal: scaleWidth(20),
    backgroundColor: COLORS.gray_bg_btn,
    borderRadius: scaleWidth(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 15, // Высота внутренней тени
    // borderBottomLeftRadius: 16,
    // borderBottomRightRadius: 16,
  },
  btnText: {
    color: COLORS.white,
    fontFamily: 'Mulish',
    fontSize: scaleFontSize(16),
  },
  disabled: {
    // backgroundColor: COLORS.primary_light,
  },

  TRANSPARENT: {
    backgroundColor: 'transparent',
  },
  ['TRANSPARENT-TEXT']: {
    color: COLORS.black,
  },

  ['BORDER-TRANSPARENT']: {
    backgroundColor: 'transparent',
    borderWidth: scaleWidth(1),
    // borderColor: COLORS.primary,
  },
  ['BORDER-TRANSPARENT-TEXT']: {
    // color: COLORS.primary,
  },

  PRIMERY: {
    // backgroundColor: COLORS.primary,
  },
  ['PRIMERY-TEXT']: {},
})
