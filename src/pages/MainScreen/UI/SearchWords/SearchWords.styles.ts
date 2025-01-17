import { scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: scaleWidth(50),
  },
  wrapper: {
    height: scaleWidth(50),
    flex: 1,
    marginRight: scaleWidth(10),
  },
})
