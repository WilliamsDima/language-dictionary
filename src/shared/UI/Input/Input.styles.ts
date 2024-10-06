import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  wrapperInput: {
    position: 'relative',
  },
  title: {
    color: COLORS.black,
    fontSize: scaleFontSize(16),
    fontWeight: '600',
    marginBottom: scaleWidth(6),

    fontFamily: 'Mulish',
  },

  input: {
    height: scaleWidth(50),
    fontSize: scaleFontSize(16),
    color: COLORS.white,
    textDecorationColor: 'transparent',
    borderWidth: scaleWidth(0),
    borderColor: COLORS.white,
    borderRadius: scaleWidth(13),
    paddingHorizontal: scaleWidth(22),
    backgroundColor: COLORS.gray_bg_btn,
    fontFamily: 'Mulish',
  },
  paddingRight: {
    paddingRight: scaleWidth(48),
  },

  focus: {
    borderColor: COLORS.primery,
    borderWidth: scaleWidth(1),
  },

  rightIcon: {
    position: 'absolute',
    right: scaleWidth(10),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    color: COLORS.gray_bg_btn,
  },
})
