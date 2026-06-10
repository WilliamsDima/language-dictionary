import { COLORS } from '@/assets/styles/colors'
import { height, scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet, NativeModules } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    height: height + (NativeModules?.StatusBarManager?.HEIGHT || 0),
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: COLORS.bg_modal,
    width: '100%',
  },
  container: {
    width: '100%',
    backgroundColor: COLORS.tab_bar_dark,
    paddingHorizontal: scaleWidth(18),
    paddingTop: scaleWidth(14),
    paddingBottom: scaleWidth(24),
    borderTopLeftRadius: scaleWidth(28),
    borderTopRightRadius: scaleWidth(28),
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.border,
  },

  wrapperContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drag: {
    alignSelf: 'center',
    width: scaleWidth(44),
    height: scaleWidth(5),
    borderRadius: scaleWidth(999),
    backgroundColor: COLORS.border,
    marginBottom: scaleWidth(14),
  },
  top: {
    marginBottom: scaleWidth(14),
  },

  title: {
    color: COLORS.white,
    fontSize: scaleFontSize(18),
    fontFamily: 'Mulish-ExtraBold',
    marginBottom: scaleWidth(4),
  },
  subtitle: {
    color: COLORS.gray_text,
    fontSize: scaleFontSize(12),
  },

  selects: {
    flexDirection: 'column',
    gap: scaleWidth(8),
  },
  section: {
    marginBottom: scaleWidth(16),
  },
  sectionTitle: {
    color: COLORS.gray_text,
    fontSize: scaleFontSize(13),
    fontFamily: 'Mulish-Bold',
    marginBottom: scaleWidth(8),
    textTransform: 'uppercase',
  },
  selectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(10),
    paddingVertical: scaleWidth(8),
  },
  circle: {
    width: scaleWidth(15),
    height: scaleWidth(15),
    borderRadius: scaleWidth(15 / 2),
    borderWidth: scaleWidth(1),
    borderColor: COLORS.border,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  circleActive: {
    borderColor: 'rgba(124, 255, 107, 0.36)',
    backgroundColor: COLORS.primery,
  },

  selectBtnText: {
    color: COLORS.white,
    fontSize: scaleFontSize(14),
    fontWeight: '600',
  },

  titleSelect: {
    color: COLORS.gray_text,
    fontSize: scaleFontSize(13),
    fontFamily: 'Mulish-Bold',
    textTransform: 'uppercase',
  },
  scrollSelect: {
    height: scaleWidth(200),
  },

  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scaleWidth(20),
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

  confirm: {
    backgroundColor: COLORS.primery,
    borderColor: 'transparent',
  },
  confirmText: {
    color: COLORS.black,
    fontSize: scaleFontSize(13),
    textTransform: 'uppercase',
  },
})
