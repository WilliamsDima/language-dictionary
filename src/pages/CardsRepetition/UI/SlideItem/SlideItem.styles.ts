import { COLORS } from '@/assets/styles/colors'
import {
  APP_PADDING,
  height,
  scaleFontSize,
  scaleWidth,
  width,
} from '@/shared/helpers/ScaleUtils'

import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
    paddingHorizontal: APP_PADDING,
    width: width,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    //height: 'auto',
    //height: scaleWidth(40),
    zIndex: 100,
    marginTop: scaleWidth(54),
  },
  press: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'white',
  },
  img: {
    // width: scaleWidth(256),
    // height: scaleWidth(256),
    // marginBottom: scaleWidth(24),
  },

  title: {
    color: COLORS.red,
    textAlign: 'center',
    fontSize: scaleFontSize(17),
    fontStyle: 'normal',
    fontWeight: '600',
  },

  card: {
    width: '100%',
    height: height / 1.8,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    backgroundColor: 'rgba(245, 251, 255, 0.98)',
    borderRadius: 28,
    borderWidth: 4,
    borderColor: COLORS.surface_light,
  },
  cardBack: {
    position: 'absolute',
    top: 0,
  },

  footer: {
    position: 'absolute',
    bottom: scaleWidth(50),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  description: {
    color: COLORS.gray_text,
    fontSize: scaleFontSize(14),
    fontStyle: 'normal',
    fontWeight: '600',
    marginBottom: scaleWidth(20),
  },

  itemWords: {
    // flexDirection: 'column',
    // gap: scaleWidth(10),
    //backgroundColor: 'red',
    maxHeight: height / 1.38,
    minHeight: height / 1.38,
    width: width - APP_PADDING * 2 - scaleWidth(20),
  },
  contentContainerStyle: {
    flexDirection: 'column',
    gap: scaleWidth(10),
  },

  itemWordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '100%',
    maxWidth: '100%',
    gap: scaleWidth(10),
    position: 'relative',
  },
  innerShadowTop: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    height: '30%',
  },
  innerShadowBottom: {
    position: 'absolute',
    bottom: 0,
    height: '30%',
  },

  itemWord: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scaleWidth(18),
    paddingHorizontal: scaleWidth(14),
    borderRadius: scaleWidth(18),
    flex: 1,
    backgroundColor: 'rgba(8, 17, 31, 0.04)',
  },
  itemWordBorder: {
    borderBottomWidth: scaleWidth(1),
    borderBottomColor: 'rgba(4, 7, 13, 0.08)',
  },

  wrapperText: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: COLORS.black,
    textAlign: 'center',
    fontSize: scaleFontSize(24),
    fontStyle: 'normal',
    fontWeight: '600',
    paddingBottom: scaleWidth(5),
    fontFamily: 'Mulish-ExtraBold',
  },
  text2: {
    color: COLORS.blue,
  },

  btn: {
    minWidth: scaleWidth(176),
    paddingVertical: scaleWidth(16),
    backgroundColor: COLORS.surface,
  },
  btnText: {
    textAlign: 'center',
    fontSize: scaleFontSize(16),
    fontStyle: 'normal',
    fontWeight: '600',
    color: COLORS.white,
  },
})
