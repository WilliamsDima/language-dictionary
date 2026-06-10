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
    maxWidth: '88%',
    minWidth: '88%',
    width: '100%',
    backgroundColor: COLORS.tab_bar_dark,
    padding: scaleWidth(18),
    borderRadius: scaleWidth(24),
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  wrapperContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: COLORS.white,
    fontSize: scaleFontSize(20),
    fontFamily: 'Mulish-ExtraBold',
  },

  text: {
    color: COLORS.red,
    fontSize: scaleFontSize(13),
    fontWeight: '600',
    marginTop: scaleWidth(10),
    lineHeight: scaleFontSize(18),
  },

  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scaleWidth(18),
    gap: scaleWidth(12),
  },

  btn: {
    paddingVertical: scaleWidth(12),
    minWidth: '45%',
    flex: 1,
    borderRadius: scaleWidth(16),
  },
  cancel: {
    borderColor: COLORS.border,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  cancelText: {
    color: COLORS.white,
    fontSize: scaleFontSize(13),
    textTransform: 'uppercase',
  },

  logout: {
    backgroundColor: COLORS.red,
    borderColor: 'transparent',
  },
  logoutText: {
    color: COLORS.white,
    fontSize: scaleFontSize(13),
    textTransform: 'uppercase',
  },
})
