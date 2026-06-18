import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.palette.bg_modal,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  content: {
    width: '100%',
    backgroundColor: theme.colors.palette.tab_bar_dark,
    borderTopLeftRadius: theme.size.s28,
    borderTopRightRadius: theme.size.s28,
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
    fontFamily: 'Mulish-ExtraBold',
    marginBottom: theme.size.s4,
  },
  subtitle: {
    fontSize: theme.fontSize.s12,
    color: theme.colors.palette.gray_text,
    marginBottom: theme.size.s18,
  },

  options: {
    flexDirection: 'column',
    gap: theme.size.s16,
  },
  scrollContent: {
    paddingBottom: theme.size.s12,
  },
  bottom: {
    marginTop: theme.size.s24,
    paddingBottom: theme.size.s30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.size.s12,
    paddingHorizontal: theme.size.s12,
  },

  btn: {
    backgroundColor: theme.colors.palette.primery,
    paddingVertical: theme.size.s12,
    borderRadius: theme.size.s16,
    flex: 1,
    borderColor: theme.colors.palette.transparent,
  },
  btnCancel: {
    backgroundColor: theme.colors.palette.white_alpha_04,
    borderColor: theme.colors.palette.border,
  },
  btnCancelText: {
    color: theme.colors.palette.white,
  },
  btnSubmitText: {
    color: theme.colors.palette.black,
  },
}))
