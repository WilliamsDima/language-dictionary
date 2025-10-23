import {
  APP_PADDING,
  scaleFontSize,
  scaleWidth,
} from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: APP_PADDING,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleWidth(40),
  },

  icon: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSelect: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: scaleFontSize(20),
    textAlign: 'center',
    marginTop: scaleWidth(20),
  },

  btns: {
    flexDirection: 'column',
    gap: scaleWidth(20),
    width: '100%',
  },
  lang: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '100%',
  },
  langIcon: {
    flex: 1,
    fontSize: 25,
  },
  wrapperSelect: {
    flex: 1,
    minWidth: '70%',
  },
})
