import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.bg_modal,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  content: {
    width: '100%',
    backgroundColor: COLORS.tab_bar_dark,
    borderTopLeftRadius: scaleWidth(28),
    borderTopRightRadius: scaleWidth(28),
    paddingHorizontal: scaleWidth(18),
    paddingTop: scaleWidth(14),
    paddingBottom: scaleWidth(24),
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
  title: {
    fontSize: scaleFontSize(18),
    fontFamily: 'Mulish-ExtraBold',
    marginBottom: scaleWidth(4),
  },
  subtitle: {
    fontSize: scaleFontSize(12),
    color: COLORS.gray_text,
    marginBottom: scaleWidth(18),
  },

  options: {
    flexDirection: 'column',
    gap: scaleWidth(16),
  },

  top: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scaleWidth(8),
  },
  closeBtn: {
    width: scaleWidth(38),
    height: scaleWidth(38),
    borderRadius: scaleWidth(19),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  bottom: {
    marginTop: scaleWidth(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scaleWidth(12),
  },

  btn: {
    backgroundColor: COLORS.primery,
    paddingVertical: scaleWidth(12),
    borderRadius: scaleWidth(16),
    flex: 1,
    borderColor: 'transparent',
  },
  btnCancel: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderColor: COLORS.border,
  },
  btnCancelText: {
    color: COLORS.white,
  },
  btnSubmitText: {
    color: COLORS.black,
  },
})
