import { HEADER_HEIGHT } from '@/widgets/Header/Header.styles'
import { COLORS } from '@/assets/styles/colors'
import { APP_PADDING, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  showHeader: {
    paddingTop: scaleWidth(20),
  },
  showHeaderWithScroll: {
    paddingTop: HEADER_HEIGHT,
  },
  padding: {
    paddingHorizontal: APP_PADDING,
  },
})
