import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: {
    minHeight: scaleWidth(48),
    paddingHorizontal: scaleWidth(18),
    backgroundColor: COLORS.surface,
    borderRadius: scaleWidth(16),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  innerShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 18,
  },
  btnText: {
    color: COLORS.white,
    fontFamily: 'Mulish-Bold',
    fontSize: scaleFontSize(14),
  },
  disabled: {
    opacity: 0.45,
  },

  TRANSPARENT: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  ['TRANSPARENT-TEXT']: {
    color: COLORS.gray_text,
  },

  ['BORDER-TRANSPARENT']: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: scaleWidth(1),
    borderColor: COLORS.border,
  },
  ['BORDER-TRANSPARENT-TEXT']: {
    color: COLORS.white,
  },

  PRIMERY: {
    backgroundColor: COLORS.primery,
    borderColor: 'transparent',
  },
  ['PRIMERY-TEXT']: {
    color: COLORS.black,
  },
})
