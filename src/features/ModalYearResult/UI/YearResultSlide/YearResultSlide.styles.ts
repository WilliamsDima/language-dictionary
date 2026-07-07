import { height, width } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create(() => ({
  slide: {
    height: height,
    width: width,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
