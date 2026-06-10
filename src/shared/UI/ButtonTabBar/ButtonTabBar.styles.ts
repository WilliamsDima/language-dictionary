import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: {
    minWidth: scaleWidth(80),
    minHeight: scaleWidth(50),
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleWidth(6),
    borderRadius: scaleWidth(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: 'rgba(124, 255, 107, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(124, 255, 107, 0.34)',
  },

  title: {
    fontSize: scaleFontSize(10),
    marginTop: scaleWidth(4),
    textAlign: 'center',
    color: COLORS.gray_text,
  },
  activeText: {
    color: COLORS.white,
  },
})
