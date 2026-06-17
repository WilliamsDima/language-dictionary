import { height } from '@/shared/helpers/ScaleUtils'
import { NativeModules } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: theme.colors.palette.bg_modal,
    width: '100%',
    height: height + (NativeModules?.StatusBarManager?.HEIGHT || 0),
  },

  wrapperContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    width: '100%',
    maxHeight: '82%',
    backgroundColor: theme.colors.palette.tab_bar_dark,
    paddingTop: theme.size.s14,
    paddingBottom: theme.size.s24,
    borderTopLeftRadius: theme.size.s28,
    borderTopRightRadius: theme.size.s28,
    overflow: 'hidden',
    alignItems: 'center',
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
  top: {
    width: '100%',
    paddingHorizontal: theme.size.s18,
    marginBottom: theme.size.s12,
  },

  scroll: {
    maxHeight: height - 300,
    width: '100%',
    paddingHorizontal: theme.size.s18,
  },
  scrollContainer: {
    gap: theme.size.s10,
    width: '100%',
    paddingBottom: theme.size.s8,
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

  item: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: theme.size.s14,
    paddingVertical: theme.size.s12,
    borderRadius: theme.size.s16,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    backgroundColor: theme.colors.palette.surface,
    variants: {
      isLast: {
        true: {
          marginBottom: theme.size.s50,
        },
      },
      itemState: {
        default: {},
        activeMulti: {
          borderColor: theme.colors.palette.success_alpha_36,
        },
        activeSingle: {
          borderColor: theme.colors.palette.success_alpha_36,
          backgroundColor: theme.colors.palette.success_alpha_12,
        },
      },
    },
  },
  done: {
    width: theme.size.s20,
    height: theme.size.s20,
    borderRadius: theme.size.s6,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.size.s10,
    variants: {
      doneActive: {
        true: {
          borderColor: theme.colors.palette.success_alpha_36,
          backgroundColor: theme.colors.palette.primery,
        },
      },
    },
  },
  full_name: {
    color: theme.colors.palette.white,
    fontSize: theme.fontSize.s14,
    textAlign: 'left',
    variants: {
      textActive: {
        true: {
          color: theme.colors.palette.primery,
        },
      },
    },
  },
  flag: {
    width: theme.size.s28,
    height: theme.size.s28,
    borderRadius: theme.size.s14,
    resizeMode: 'cover',
    marginRight: theme.size.s8,
  },

  btns: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.size.s18,
    paddingTop: theme.size.s14,
    gap: theme.size.s12,
    borderTopWidth: theme.size.s1,
    borderTopColor: theme.colors.palette.border,
  },
  actionBtn: {
    flex: 1,
    minHeight: theme.size.s48,
    borderRadius: theme.size.s16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: theme.size.s1,
  },
  actionBtnCancel: {
    backgroundColor: theme.colors.palette.white_alpha_04,
    borderColor: theme.colors.palette.border,
  },
  actionBtnConfirm: {
    backgroundColor: theme.colors.palette.success_alpha_14,
    borderColor: theme.colors.palette.success_alpha_36,
  },
  actionTextCancel: {
    color: theme.colors.palette.white,
    fontSize: theme.fontSize.s13,
    fontFamily: 'Mulish-Bold',
    textTransform: 'uppercase',
  },
  actionTextConfirm: {
    color: theme.colors.palette.primery,
    fontSize: theme.fontSize.s13,
    fontFamily: 'Mulish-Bold',
    textTransform: 'uppercase',
  },
}))