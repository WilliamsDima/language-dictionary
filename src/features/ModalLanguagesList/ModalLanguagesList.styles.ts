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
    maxHeight: '78%',
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
    marginBottom: scaleWidth(12),
  },

  scroll: {
    flexGrow: 0,
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

  name: {
    color: COLORS.white,
    fontSize: scaleFontSize(14),
    fontFamily: 'Mulish-Bold',
  },
  nameActive: {
    color: COLORS.primery,
  },
  code: {
    color: COLORS.gray_text,
    fontSize: scaleFontSize(11),
    marginTop: scaleWidth(2),
  },

  list: {
    gap: scaleWidth(10),
    paddingBottom: scaleWidth(8),
  },
  languageInfo: {
    flex: 1,
  },

  item: {
    paddingHorizontal: scaleWidth(14),
    paddingVertical: scaleWidth(12),
    borderWidth: scaleWidth(1),
    borderColor: COLORS.border,
    borderRadius: scaleWidth(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },

  isLast: {
    marginBottom: scaleWidth(20),
  },

  active: {
    borderColor: 'rgba(124, 255, 107, 0.36)',
    backgroundColor: 'rgba(124, 255, 107, 0.12)',
  },
  icon: {
    width: scaleWidth(28),
    height: scaleWidth(28),
    borderRadius: scaleWidth(14),
    resizeMode: 'cover',
  },
})
