import { height } from '@/shared/helpers/ScaleUtils'
import { NativeModules } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme, rt) => ({
  wrapper: {
    height: height + (NativeModules?.StatusBarManager?.HEIGHT || 0),
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: theme.colors.overlay.modal,
    width: '100%',
  },
  container: {
    width: '100%',
    maxHeight: '78%',
    backgroundColor: theme.colors.background.surface,
    paddingHorizontal: theme.size.s18,
    paddingTop: theme.size.s14,
    paddingBottom: theme.size.s24,
    borderTopLeftRadius: theme.size.s28,
    borderTopRightRadius: theme.size.s28,
    borderTopWidth: theme.size.s1,
    borderLeftWidth: theme.size.s1,
    borderRightWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },

  wrapperContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drag: {
    alignSelf: 'center',
    width: theme.size.s44,
    height: theme.size.s5,
    borderRadius: theme.size.s999,
    backgroundColor: theme.colors.palette.border,
    marginBottom: theme.size.s14,
  },
  top: {
    marginBottom: theme.size.s12,
  },

  scroll: {
    flexGrow: 0,
  },

  title: {
    color: theme.colors.palette.primery,
    fontSize: theme.fontSize.s18,
    marginBottom: theme.size.s4,
    fontFamily: 'Mulish-ExtraBold',
  },
  subtitle: {
    fontSize: theme.fontSize.s12,
    color: theme.colors.palette.gray_text,
  },

  name: {
    color: theme.colors.text.primary,
    fontSize: theme.fontSize.s14,
    fontFamily: 'Mulish-Bold',
  },
  nameActive: {
    color: theme.colors.palette.primery,
  },
  code: {
    color: theme.colors.palette.gray_text,
    fontSize: theme.fontSize.s11,
    marginTop: theme.size.s2,
  },

  list: {
    gap: theme.size.s10,
    paddingBottom: theme.size.s8,
  },
  languageInfo: {
    flex: 1,
  },

  item: {
    paddingHorizontal: theme.size.s14,
    paddingVertical: theme.size.s12,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    borderRadius: theme.size.s16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background.surface,
  },
  itemActive: {
    borderColor: theme.colors.palette.success_alpha_36,
    backgroundColor: theme.colors.palette.success_alpha_12,
  },
  itemLast: {
    marginBottom: theme.size.s20,
  },
  icon: {
    fontSize: theme.fontSize.s20,
  },

  footer: {
    width: '100%',
    flexDirection: 'row',
    gap: theme.size.s12,
    paddingTop: theme.size.s12,
    paddingHorizontal: theme.size.s12,
    paddingBottom: rt.insets.bottom + theme.size.s12,
  },
  footerBtn: {
    flex: 1,
  },
}))
