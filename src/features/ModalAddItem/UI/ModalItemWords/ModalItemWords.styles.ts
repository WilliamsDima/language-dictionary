import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  inputs: {
    gap: scaleWidth(10),
    paddingHorizontal: scaleWidth(12),
    borderBottomWidth: scaleWidth(1),
    borderBottomColor: COLORS.border,
    paddingVertical: scaleWidth(14),
    backgroundColor: 'rgba(255, 255, 255, 0.015)',
    borderRadius: scaleWidth(18),
    marginBottom: scaleWidth(10),
  },

  index: {
    color: COLORS.primery,
    textAlign: 'left',
    fontSize: scaleFontSize(14),
    fontFamily: 'Mulish-ExtraBold',
  },
  input: {
    maxHeight: scaleWidth(100),
    height: 'auto',
    backgroundColor: COLORS.surface,
    color: COLORS.white,
  },

  footer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  deleteBtn: {
    width: scaleWidth(40),
    height: scaleWidth(40),
    borderRadius: scaleWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 89, 89, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 89, 89, 0.24)',
  },
})
