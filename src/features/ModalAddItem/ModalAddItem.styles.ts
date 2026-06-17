import { height } from '@/shared/helpers/ScaleUtils'
import { NativeModules } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    height: height + (NativeModules?.StatusBarManager?.HEIGHT || 0),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.palette.bg_modal,
    width: '100%',
  },
  container: {
    maxWidth: '90%',
    minWidth: '90%',
    maxHeight: '90%',
    minHeight: '90%',
    backgroundColor: theme.colors.palette.tab_bar_dark,
    paddingTop: theme.size.s14,
    borderRadius: theme.size.s28,
    alignItems: 'center',
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },

  wrapperContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scroll: {
    maxHeight: '95%',
    minWidth: '100%',
    paddingHorizontal: theme.size.s16,
  },

  title: {
    color: theme.colors.palette.primery,
    fontSize: theme.fontSize.s20,
    textAlign: 'center',
    marginBottom: theme.size.s18,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-ExtraBold',
  },
  subtitle: {
    fontSize: theme.fontSize.s12,
    color: theme.colors.palette.gray_text,
    textAlign: 'center',
    marginBottom: theme.size.s18,
  },
  btnWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: theme.size.s16,
  },
  btnAddItem: {
    width: theme.size.s56,
    height: theme.size.s56,
    borderRadius: theme.size.s28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.palette.surface_light,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },

  input: {
    maxHeight: theme.size.s100,
    height: 'auto',
    backgroundColor: theme.colors.palette.surface,
    color: theme.colors.palette.white,
  },

  btns: {
    maxWidth: '100%',
    minWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.size.s20,
    marginTop: theme.size.s8,
    marginBottom: theme.size.s20,
  },
  actionBtn: {
    width: theme.size.s52,
    height: theme.size.s52,
    borderRadius: theme.size.s26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.palette.surface_light,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  actionBtnPrimary: {
    backgroundColor: theme.colors.palette.success_alpha_14,
    borderColor: theme.colors.palette.success_alpha_34,
  },
  actionBtnDanger: {
    backgroundColor: theme.colors.palette.danger_alpha_12,
    borderColor: theme.colors.palette.danger_alpha_24,
  },

  footer: {
    marginTop: theme.size.s18,
    paddingTop: theme.size.s18,
    borderTopWidth: theme.size.s1,
    borderTopColor: theme.colors.palette.border,
  },

  selectLang: {
    marginTop: theme.size.s12,
  },
}))