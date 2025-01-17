import { COLORS } from '@/assets/styles/colors'
import { height, scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet, NativeModules } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    height: height + (NativeModules?.StatusBarManager?.HEIGHT || 0),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bg_modal,
    width: '100%',
  },
  container: {
    maxWidth: '90%',
    minWidth: '90%',
    width: '100%',
    backgroundColor: COLORS.white,
    padding: scaleWidth(20),
    borderRadius: scaleWidth(10),
  },

  wrapperContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: COLORS.black,
    fontSize: scaleFontSize(20),
    fontWeight: '600',
  },

  selects: {
    flexDirection: 'column',
    gap: scaleWidth(5),
    marginVertical: scaleWidth(20),
  },
  selectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(10),
    paddingVertical: scaleWidth(5),
  },
  circle: {
    width: scaleWidth(15),
    height: scaleWidth(15),
    borderRadius: scaleWidth(15 / 2),
    borderWidth: scaleWidth(1),
    borderColor: COLORS.black,
  },
  circleActive: {
    borderColor: COLORS.primery,
    backgroundColor: COLORS.green,
  },

  selectBtnText: {
    color: COLORS.black,
    fontSize: scaleFontSize(16),
    fontWeight: '600',
  },

  titleSelect: {
    color: COLORS.black,
    fontSize: scaleFontSize(16),
    fontWeight: '600',
  },
  scrollSelect: {
    height: scaleWidth(200),
  },

  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scaleWidth(20),
  },

  btn: {
    padding: scaleWidth(15),
    minWidth: '45%',
  },
  cancel: {
    borderColor: COLORS.black,
  },
  cancelText: {
    color: COLORS.black,
    fontSize: scaleFontSize(14),
    textTransform: 'uppercase',
  },

  confirm: {
    backgroundColor: COLORS.primery,
  },
  confirmText: {
    color: COLORS.white,
    fontSize: scaleFontSize(14),
    textTransform: 'uppercase',
  },
})
