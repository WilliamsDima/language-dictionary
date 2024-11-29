import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  btn: {
    width: '100%',
    paddingVertical: scaleWidth(15),
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: scaleFontSize(16),
    marginRight: scaleWidth(15),
  },
})
