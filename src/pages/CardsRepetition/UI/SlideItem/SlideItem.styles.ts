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
    paddingTop: theme.size.s4,
    paddingBottom: theme.size.s16,
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
    minHeight: height / 2.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.palette.white_surface_98,
    borderRadius: theme.size.s28,
    borderWidth: theme.size.s4,
    borderColor: theme.colors.palette.surface_light,
    gap: theme.size.s10,
  },

  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: theme.size.s24,
  },
  description: {
    color: theme.colors.palette.black,
    fontSize: theme.fontSize.s14,
    fontStyle: 'normal',
    fontWeight: '600',
  },

  itemWords: {
    flexGrow: 0,
    maxHeight: height / 1.55,
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
    backgroundColor: theme.colors.palette.ink_alpha_04,
  },

  wrapperText: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: theme.colors.palette.black,
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
    backgroundColor: theme.colors.palette.surface,
  },
  btnText: {
    textAlign: 'center',
    fontSize: theme.fontSize.s16,
    fontStyle: 'normal',
    fontWeight: '600',
    color: theme.colors.palette.white,
  },
}))
