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
    maxHeight: '90%',
    minHeight: '90%',
    backgroundColor: COLORS.tab_bar_dark,
    paddingTop: scaleWidth(14),
    borderRadius: scaleWidth(28),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  wrapperContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scroll: {
    maxHeight: '95%',
    minWidth: '100%',
    paddingHorizontal: scaleWidth(16),
  },

  title: {
    color: COLORS.primery,
    fontSize: scaleFontSize(20),
    textAlign: 'center',
    marginBottom: scaleWidth(18),
    textTransform: 'uppercase',
    fontFamily: 'Mulish-ExtraBold',
  },
  subtitle: {
    fontSize: scaleFontSize(12),
    color: COLORS.gray_text,
    textAlign: 'center',
    marginBottom: scaleWidth(18),
  },
  btnWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: scaleWidth(16),
  },
  btnAddItem: {
    width: scaleWidth(56),
    height: scaleWidth(56),
    borderRadius: scaleWidth(28),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface_light,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  input: {
    maxHeight: scaleWidth(100),
    height: 'auto',
    backgroundColor: COLORS.surface,
    color: COLORS.white,
  },

  btns: {
    maxWidth: '100%',
    minWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(20),
    marginTop: scaleWidth(8),
    marginBottom: scaleWidth(20),
  },
  actionBtn: {
    width: scaleWidth(52),
    height: scaleWidth(52),
    borderRadius: scaleWidth(26),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface_light,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionBtnPrimary: {
    backgroundColor: 'rgba(124, 255, 107, 0.14)',
    borderColor: 'rgba(124, 255, 107, 0.34)',
  },
  actionBtnDanger: {
    backgroundColor: 'rgba(255, 89, 89, 0.12)',
    borderColor: 'rgba(255, 89, 89, 0.24)',
  },

  footer: {
    marginTop: scaleWidth(18),
    paddingTop: scaleWidth(18),
    borderTopWidth: scaleWidth(1),
    borderTopColor: COLORS.border,
  },

  selectLang: {
    marginTop: scaleWidth(12),
  },
})
