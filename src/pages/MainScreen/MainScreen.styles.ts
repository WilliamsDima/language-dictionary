import { APP_PADDING, height, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: APP_PADDING,
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: scaleWidth(20),
    height,
  },
  top: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
