import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: COLORS.tab_bar_dark,
    borderTopRightRadius: scaleWidth(28),
    borderTopLeftRadius: scaleWidth(28),
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
    color: COLORS.white,
    fontFamily: 'Mulish-ExtraBold',
    marginBottom: scaleWidth(4),
  },
  subtitle: {
    fontSize: scaleFontSize(12),
    color: COLORS.gray_text,
  },

  btns: {
    marginTop: scaleWidth(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scaleWidth(12),
  },
  btn: {
    paddingVertical: scaleWidth(12),
    flex: 1,
    backgroundColor: COLORS.primery,
    borderColor: 'transparent',
    borderRadius: scaleWidth(16),
  },
  btnCancel: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderColor: COLORS.border,
  },
  textBtn: {
    textTransform: 'uppercase',
    fontSize: scaleFontSize(13),
  },
  textBtnCancel: {
    textTransform: 'uppercase',
    fontSize: scaleFontSize(13),
    color: COLORS.white,
  },
  textBtnConfirm: {
    textTransform: 'uppercase',
    fontSize: scaleFontSize(13),
    color: COLORS.black,
  },
})
