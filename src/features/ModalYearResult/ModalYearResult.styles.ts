import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  modal: {},

  content: {
    backgroundColor: COLORS.black,
    flex: 1,
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
