import { height } from '@/shared/helpers/ScaleUtils'
import { NativeModules } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme, rt) => ({
  wrapper: {
    height: height + (NativeModules?.StatusBarManager?.HEIGHT || 0),
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: theme.colors.palette.bg_modal,
    width: '100%',
  },
  container: {
    width: '100%',
    backgroundColor: theme.colors.palette.tab_bar_dark,
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
    marginBottom: theme.size.s14,
  },

  title: {
    color: theme.colors.palette.white,
    fontSize: theme.fontSize.s18,
    fontFamily: 'Mulish-ExtraBold',
    marginBottom: theme.size.s4,
  },
  subtitle: {
    color: theme.colors.palette.gray_text,
    fontSize: theme.fontSize.s12,
  },

  selects: {
    flexDirection: 'column',
    gap: theme.size.s8,
  },
  section: {
    marginBottom: theme.size.s16,
  },
  sectionTitle: {
    color: theme.colors.palette.gray_text,
    fontSize: theme.fontSize.s13,
    fontFamily: 'Mulish-Bold',
    marginBottom: theme.size.s8,
    textTransform: 'uppercase',
  },
  selectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.size.s10,
    paddingVertical: theme.size.s8,
  },
  circle: {
    width: theme.size.s15,
    height: theme.size.s15,
    borderRadius: theme.size.s15 / 2,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    backgroundColor: theme.colors.palette.white_alpha_03,
    variants: {
      circleActive: {
        true: {
          borderColor: theme.colors.palette.success_alpha_36,
          backgroundColor: theme.colors.palette.primery,
        },
      },
    },
  },

  selectBtnText: {
    color: theme.colors.palette.white,
    fontSize: theme.fontSize.s14,
    fontWeight: '600',
  },

  titleSelect: {
    color: theme.colors.palette.gray_text,
    fontSize: theme.fontSize.s13,
    fontFamily: 'Mulish-Bold',
    textTransform: 'uppercase',
  },
  scrollSelect: {
    height: theme.size.s200,
  },
  scrollContent: {
    paddingBottom: theme.size.s12,
  },

  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.size.s20,
    gap: theme.size.s12,
    paddingHorizontal: theme.size.s12,
    paddingBottom: rt.insets.bottom + theme.size.s12,
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
    color: theme.colors.palette.white,
    fontSize: theme.fontSize.s13,
    textTransform: 'uppercase',
  },

  confirm: {
    backgroundColor: theme.colors.palette.primery,
    borderColor: theme.colors.palette.transparent,
  },
  confirmText: {
    color: theme.colors.palette.black,
    fontSize: theme.fontSize.s13,
    textTransform: 'uppercase',
  },
}))
