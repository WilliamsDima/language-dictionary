import { height, width } from '@/shared/helpers/ScaleUtils'

import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    width: width,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  item: {
    paddingHorizontal: theme.layout.appPadding,
    width: width,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },

  title: {
    color: theme.colors.palette.red,
    textAlign: 'center',
    fontSize: theme.fontSize.s17,
    fontStyle: 'normal',
    fontWeight: '600',
  },

  card: {
    width: '100%',
    minHeight: height / 1.85,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.surface,
    borderRadius: theme.size.s28,
    borderWidth: theme.size.s2,
    borderColor: theme.colors.palette.border,
    gap: theme.size.s10,
  },

  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: theme.size.s14,
  },
  description: {
    color: theme.colors.palette.gray_text,
    fontSize: theme.fontSize.s14,
    fontStyle: 'normal',
    fontWeight: '600',
  },

  itemWords: {
    flexGrow: 0,
    maxHeight: height / 1.38,
    width: width - theme.layout.appPadding * 2 - theme.size.s20,
  },
  contentContainerStyle: {
    flexDirection: 'column',
    gap: theme.size.s10,
  },

  itemWordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '100%',
    maxWidth: '100%',
    gap: theme.size.s10,
  },

  itemWord: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.size.s18,
    flex: 1,
    backgroundColor: theme.colors.palette.white_alpha_04,
    borderRadius: theme.size.s6,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.white_alpha_06,
  },

  wrapperText: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: theme.colors.text.primary,
    textAlign: 'center',
    fontSize: theme.fontSize.s24,
    fontStyle: 'normal',
    fontWeight: '600',
    paddingBottom: theme.size.s5,
    fontFamily: 'Mulish-ExtraBold',
    variants: {
      isFlipped: {
        true: {
          color: theme.colors.palette.blue,
        },
      },
    },
  },

  btn: {
    minWidth: theme.size.s176,
    paddingVertical: theme.size.s16,
    backgroundColor: theme.colors.background.input,
  },
  btnText: {
    textAlign: 'center',
    fontSize: theme.fontSize.s16,
    fontStyle: 'normal',
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
}))
