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
    fontSize: scaleFontSize(24),
    fontWeight: '600',
  },

  text: {
    color: COLORS.red,
    fontSize: scaleFontSize(14),
    fontWeight: '600',
    marginTop: scaleWidth(10),
  },

  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scaleWidth(10),
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

  logout: {
    backgroundColor: COLORS.red,
  },
  logoutText: {
    color: COLORS.white,
    fontSize: scaleFontSize(14),
    textTransform: 'uppercase',
  },
})
