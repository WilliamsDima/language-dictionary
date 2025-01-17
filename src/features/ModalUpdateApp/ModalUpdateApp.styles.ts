import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: scaleWidth(16),
    borderTopLeftRadius: scaleWidth(16),
    padding: scaleWidth(20),
  },
  title: {
    fontSize: scaleFontSize(20),
    color: COLORS.black,
    textAlign: 'center',
  },

  btns: {
    marginTop: scaleWidth(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scaleWidth(10),
  },
  btn: {
    padding: scaleWidth(10),
    flex: 1,
    backgroundColor: COLORS.primery,
  },
  btnCancel: {
    backgroundColor: COLORS.red,
  },
  textBtn: {
    textTransform: 'uppercase',
  },
})
