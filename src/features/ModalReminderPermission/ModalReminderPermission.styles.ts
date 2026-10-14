import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
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
    textAlign: 'center',
    fontSize: theme.fontSize.s13,
    color: theme.colors.text.primary,
  },
  textBtnConfirm: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: theme.fontSize.s13,
    color: theme.colors.base.black,
  },
}))
