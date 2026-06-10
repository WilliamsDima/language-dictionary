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
    color: COLORS.gray_text,
    fontSize: scaleFontSize(14),
    fontWeight: '700',
    marginBottom: scaleWidth(8),
    fontFamily: 'Mulish-Bold',
  },

  input: {
    height: scaleWidth(50),
    fontSize: scaleFontSize(15),
    color: COLORS.white,
    textDecorationColor: 'transparent',
    borderWidth: scaleWidth(1),
    borderColor: COLORS.border,
    borderRadius: scaleWidth(16),
    paddingHorizontal: scaleWidth(18),
    backgroundColor: 'rgba(17, 39, 65, 0.92)',
    fontFamily: 'Mulish-SemiBold',
  },
  paddingRight: {
    paddingRight: scaleWidth(48),
  },

  focus: {
    borderColor: COLORS.primery,
    borderWidth: scaleWidth(1),
    backgroundColor: COLORS.surface_light,
  },

  rightIcon: {
    position: 'absolute',
    right: scaleWidth(10),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    color: COLORS.dark_placeholder,
  },
})
