import { scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  items: {
    flex: 1,
    gap: scaleWidth(5),
    marginRight: scaleWidth(5),
  },
})
