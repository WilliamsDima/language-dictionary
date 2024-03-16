import { COLORS } from '@/assets/styles/colors'
import {
  APP_PADDING,
  scaleFontSize,
  scaleWidth,
} from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: APP_PADDING,
    position: 'relative',
    justifyContent: 'flex-start',
    paddingTop: scaleWidth(20),
  },

  logout: {
    marginTop: scaleWidth(20),
    padding: scaleWidth(15),
    backgroundColor: COLORS.red,
  },

  logoutText: {
    fontSize: scaleFontSize(14),
    textTransform: 'uppercase',
  },
})
