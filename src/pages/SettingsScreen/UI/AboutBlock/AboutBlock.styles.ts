import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  item: {
    marginBottom: scaleWidth(10),
    width: '100%',
  },

  blockName: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: scaleFontSize(16),
    color: COLORS.white,
    marginBottom: scaleWidth(5),
    fontWeight: '700',
  },
  appName: {
    color: COLORS.green,
  },

  textBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: scaleFontSize(14),
    color: COLORS.white,
  },

  punktsBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  punkt: {
    fontSize: scaleFontSize(14),
    color: COLORS.white,
    marginVertical: scaleWidth(5),
  },
})
