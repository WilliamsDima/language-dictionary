import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  modal: {
    justifyContent: 'flex-end',
    margin: theme.size.s0,
  },
  content: {
    backgroundColor: theme.colors.background.surface,
    borderTopRightRadius: theme.size.s28,
    borderTopLeftRadius: theme.size.s28,
    paddingHorizontal: theme.size.s18,
    paddingTop: theme.size.s14,
    paddingBottom: theme.size.s24,
    borderTopWidth: theme.size.s1,
    borderLeftWidth: theme.size.s1,
    borderRightWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  drag: {
    alignSelf: 'center',
    width: theme.size.s44,
    height: theme.size.s5,
    borderRadius: theme.size.s999,
    backgroundColor: theme.colors.palette.border,
    marginBottom: theme.size.s14,
  },
  title: {
    fontSize: theme.fontSize.s18,
    color: theme.colors.text.primary,
    fontFamily: 'Mulish-ExtraBold',
    marginBottom: theme.size.s4,
  },
  subtitle: {
    fontSize: theme.fontSize.s12,
    color: theme.colors.palette.gray_text,
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
  textBtn: {
    textTransform: 'uppercase',
    fontSize: theme.fontSize.s13,
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
