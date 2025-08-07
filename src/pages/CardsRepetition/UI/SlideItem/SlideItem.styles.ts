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
    marginTop: scaleWidth(30),
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
    backfaceVisibility: 'hidden', // Скрыть обратную сторону
    backgroundColor: COLORS.white,
    borderRadius: 10,
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

    padding: scaleWidth(10),
    borderRadius: scaleWidth(10),
    flex: 1,
  },
  itemWordBorder: {
    borderBottomWidth: scaleWidth(1),
    borderBottomColor: COLORS.black,
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
    fontSize: scaleFontSize(20),
    fontStyle: 'normal',
    fontWeight: '600',
    paddingBottom: scaleWidth(5),
  },
  text2: {
    color: COLORS.primery,
  },

  btn: {
    padding: scaleWidth(10),
  },
  btnText: {
    textAlign: 'center',
    fontSize: scaleFontSize(16),
    fontStyle: 'normal',
    fontWeight: '600',
  },
})
