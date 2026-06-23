import { height, width } from '@/shared/helpers/ScaleUtils'

import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    // backgroundColor: 'red',
    minHeight: '100%',
    //minWidth: '100%',

    // flex: 1,
  },
  itemWrapper: {
    height: height,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    width: '100%',
  },
  item: {
    paddingHorizontal: theme.layout.appPadding,
    width: width,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    //height: 'auto',
    //height: theme.size.s40,
    zIndex: 100,
    marginTop: theme.size.s54,
  },
  press: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'white',
  },
  img: {
    // width: theme.size.s256,
    // height: theme.size.s256,
    // marginBottom: theme.size.s24,
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
    height: height / 1.8,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    backgroundColor: theme.colors.palette.white_surface_98,
    borderRadius: theme.size.s28,
    borderWidth: theme.size.s4,
    borderColor: theme.colors.palette.surface_light,
    gap: theme.size.s10,
  },
  cardBack: {
    position: 'absolute',
    top: theme.size.s0,
  },

  footer: {
    position: 'absolute',
    bottom: theme.size.s50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  description: {
    color: theme.colors.palette.gray_text,
    fontSize: theme.fontSize.s14,
    fontStyle: 'normal',
    fontWeight: '600',
    marginBottom: theme.size.s20,
  },

  itemWords: {
    // flexDirection: 'column',
    // gap: theme.size.s10,
    //backgroundColor: 'red',
    maxHeight: height / 1.38,
    minHeight: height / 1.38,
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
    position: 'relative',
  },
  innerShadowTop: {
    position: 'absolute',
    top: -10,
    left: theme.size.s0,
    right: theme.size.s0,
    height: '30%',
  },
  innerShadowBottom: {
    position: 'absolute',
    bottom: theme.size.s0,
    height: '30%',
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
