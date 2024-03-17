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
    paddingBottom: scaleWidth(40),
  },

  privacyPolicy: {
    padding: scaleWidth(15),
    marginVertical: scaleWidth(20),
    borderColor: COLORS.white,
  },
  privacyPolicyText: {
    color: COLORS.white,
    fontSize: scaleFontSize(16),
  },
})
