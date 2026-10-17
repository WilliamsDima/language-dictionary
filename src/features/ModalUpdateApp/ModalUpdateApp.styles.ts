import { StyleSheet } from 'react-native-unistyles'

// шапка (заголовок/подзаголовок), фон и отступ от системной навигации —
// в shared/UI/BottomSheet (variant="view")
export const styles = StyleSheet.create((theme) => ({
  version: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.text.primary,
    fontFamily: 'Mulish-Bold',
  },

  btns: {
    marginTop: theme.size.s20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.size.s12,
  },
  btn: {
    paddingVertical: theme.size.s12,
    flex: 1,
    backgroundColor: theme.colors.palette.primery,
    borderColor: theme.colors.palette.transparent,
    borderRadius: theme.size.s16,
  },
  btnCancel: {
    backgroundColor: theme.colors.palette.white_alpha_04,
    borderColor: theme.colors.palette.border,
  },
  textBtnCancel: {
    textTransform: 'uppercase',
    fontSize: theme.fontSize.s13,
    color: theme.colors.text.primary,
  },
  textBtnConfirm: {
    textTransform: 'uppercase',
    fontSize: theme.fontSize.s13,
    color: theme.colors.base.black,
  },
}))
