import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  btn: {
    width: '100%',
    paddingVertical: scaleWidth(16),
    alignItems: 'center',
    backgroundColor: COLORS.primery,
    borderColor: 'transparent',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: scaleFontSize(16),
    marginRight: scaleWidth(15),
    color: COLORS.black,
    fontFamily: 'Mulish-ExtraBold',
  },
})
