import { COLORS } from '@/assets/styles/colors'
import { height, scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet, NativeModules } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: COLORS.bg_modal,
    width: '100%',
    height: height + (NativeModules?.StatusBarManager?.HEIGHT || 0),
  },

  wrapperContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    width: '100%',
    maxHeight: '82%',
    backgroundColor: COLORS.tab_bar_dark,
    paddingTop: scaleWidth(14),
    paddingBottom: scaleWidth(24),
    borderTopLeftRadius: scaleWidth(28),
    borderTopRightRadius: scaleWidth(28),
    overflow: 'hidden',
    alignItems: 'center',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.border,
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
    width: '100%',
    paddingHorizontal: scaleWidth(18),
    marginBottom: scaleWidth(12),
  },

  scroll: {
    maxHeight: height - 300,
    width: '100%',
    paddingHorizontal: scaleWidth(18),
  },
  scrollContainer: {
    gap: scaleWidth(10),
    width: '100%',
    paddingBottom: scaleWidth(8),
  },

  title: {
    color: COLORS.primery,
    fontSize: scaleFontSize(18),
    marginBottom: scaleWidth(4),
    fontFamily: 'Mulish-ExtraBold',
  },
  subtitle: {
    fontSize: scaleFontSize(12),
    color: COLORS.gray_text,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: scaleWidth(14),
    paddingVertical: scaleWidth(12),
    borderRadius: scaleWidth(16),
    borderWidth: scaleWidth(1),
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  itemActive: {
    borderColor: 'rgba(124, 255, 107, 0.36)',
  },
  itemActiveSingle: {
    backgroundColor: 'rgba(124, 255, 107, 0.12)',
  },
  done: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    borderRadius: scaleWidth(6),
    borderWidth: scaleWidth(1),
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleWidth(10),
  },
  doneActive: {
    borderColor: 'rgba(124, 255, 107, 0.36)',
    backgroundColor: COLORS.primery,
  },
  full_name: {
    color: COLORS.white,
    fontSize: scaleFontSize(14),
    textAlign: 'left',
  },
  full_nameActive: {
    color: COLORS.primery,
  },
  flag: {
    width: scaleWidth(28),
    height: scaleWidth(28),
    borderRadius: scaleWidth(14),
    resizeMode: 'cover',
    marginRight: scaleWidth(8),
  },

  btns: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(18),
    paddingTop: scaleWidth(14),
    gap: scaleWidth(12),
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionBtn: {
    flex: 1,
    minHeight: scaleWidth(48),
    borderRadius: scaleWidth(16),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  actionBtnCancel: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderColor: COLORS.border,
  },
  actionBtnConfirm: {
    backgroundColor: 'rgba(124, 255, 107, 0.14)',
    borderColor: 'rgba(124, 255, 107, 0.36)',
  },
  actionTextCancel: {
    color: COLORS.white,
    fontSize: scaleFontSize(13),
    fontFamily: 'Mulish-Bold',
    textTransform: 'uppercase',
  },
  actionTextConfirm: {
    color: COLORS.primery,
    fontSize: scaleFontSize(13),
    fontFamily: 'Mulish-Bold',
    textTransform: 'uppercase',
  },
})
