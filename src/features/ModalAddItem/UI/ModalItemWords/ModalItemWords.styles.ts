import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  inputs: {
    gap: scaleWidth(10),
    paddingHorizontal: scaleWidth(10),
    borderBottomWidth: scaleWidth(1),
    borderBottomColor: COLORS.green,
    paddingVertical: scaleWidth(10),
  },

  index: {
    color: COLORS.green,
    textAlign: 'center',
    fontSize: scaleFontSize(15),
  },
  input: {
    maxHeight: scaleWidth(100),
    height: 'auto',
    backgroundColor: COLORS.gray_text,
    color: COLORS.black,
  },

  footer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  deleteBtn: {},
})
