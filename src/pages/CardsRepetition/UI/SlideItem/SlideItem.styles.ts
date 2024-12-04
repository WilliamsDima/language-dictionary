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
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
  },
  item: {
    paddingHorizontal: APP_PADDING,
    width: width,
    //height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    //height: 'auto',
    //height: scaleWidth(40),
    zIndex: 100,
  },
  press: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: scaleWidth(300),
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

  itemWords: {
    // flexDirection: 'column',
    // gap: scaleWidth(10),
    //backgroundColor: 'red',
    maxHeight: height / 1.4,
    minHeight: height / 1.4,
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
  },

  itemWord: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scaleWidth(1),
    borderColor: COLORS.white,
    padding: scaleWidth(10),
    borderRadius: scaleWidth(10),
    flex: 1,
  },
  text2: {
    borderTopWidth: scaleWidth(1),
    borderTopColor: COLORS.gray_text,
    width: '100%',
    textAlign: 'center',
    paddingTop: scaleWidth(5),

    color: COLORS.primery,
    fontSize: scaleFontSize(20),
    fontStyle: 'normal',
    fontWeight: '600',
  },
  text: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: scaleFontSize(20),
    fontStyle: 'normal',
    fontWeight: '600',
    paddingBottom: scaleWidth(5),
  },
})
