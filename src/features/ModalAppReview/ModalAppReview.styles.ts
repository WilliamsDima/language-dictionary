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
  wrapperContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    maxWidth: '88%',
    minWidth: '88%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: theme.colors.background.surface,
    padding: theme.size.s24,
    borderRadius: theme.size.s24,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  closeBtn: {
    position: 'absolute',
    top: theme.size.s14,
    right: theme.size.s14,
    padding: theme.size.s6,
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: theme.fontSize.s20,
    fontFamily: theme.fonts.extraBold,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: theme.size.s8,
    color: theme.colors.palette.gray_text,
    fontSize: theme.fontSize.s13,
    textAlign: 'center',
    lineHeight: theme.lineHeights.md,
  },
  stars: {
    flexDirection: 'row',
    gap: theme.size.s10,
    marginTop: theme.size.s24,
  },
  emotion: {
    marginTop: theme.size.s14,
    fontSize: theme.fontSize.s40,
  },
  btn: {
    marginTop: theme.size.s24,
    width: '100%',
    paddingVertical: theme.size.s14,
    borderRadius: theme.size.s16,
  },
}))
