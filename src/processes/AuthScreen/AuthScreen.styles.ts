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
})
