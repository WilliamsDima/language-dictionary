import { height } from '@/shared/helpers/ScaleUtils'
import { NativeModules } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    height: height + (NativeModules?.StatusBarManager?.HEIGHT || 0),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.overlay.modal,
    width: '100%',
  },
  container: {
    maxWidth: '88%',
    minWidth: '88%',
    width: '100%',
    backgroundColor: theme.colors.background.surface,
    padding: theme.size.s18,
    borderRadius: theme.size.s24,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },

  wrapperContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: theme.colors.text.primary,
    fontSize: theme.fontSize.s20,
    fontFamily: 'Mulish-ExtraBold',
  },

  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.size.s18,
    gap: theme.size.s12,
  },

  btn: {
    paddingVertical: theme.size.s12,
    minWidth: '45%',
    flex: 1,
    borderRadius: theme.size.s16,
  },
  cancel: {
    borderColor: theme.colors.palette.border,
    backgroundColor: theme.colors.palette.white_alpha_04,
  },
  cancelText: {
    color: theme.colors.text.primary,
    fontSize: theme.fontSize.s13,
    textTransform: 'uppercase',
  },

  logout: {
    backgroundColor: theme.colors.palette.red,
    borderColor: theme.colors.palette.transparent,
  },
  logoutText: {
    color: theme.colors.base.white,
    fontSize: theme.fontSize.s13,
    textTransform: 'uppercase',
  },
}))
