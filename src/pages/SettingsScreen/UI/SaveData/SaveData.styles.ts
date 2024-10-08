import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    marginVertical: scaleWidth(20),
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scaleWidth(10),
  },
  btnText: {
    flex: 1,
    fontSize: scaleFontSize(16),
    color: COLORS.primery,
  },
  saveData: {
    fontSize: scaleFontSize(13),
    color: COLORS.gray_text,
    marginTop: scaleWidth(5),
  },
})
