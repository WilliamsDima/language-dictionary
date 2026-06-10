import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: scaleWidth(18),
    borderRadius: scaleWidth(24),
    backgroundColor: 'rgba(17, 39, 65, 0.9)',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  item: {
    marginBottom: scaleWidth(14),
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
    fontFamily: 'Mulish-Bold',
  },
  appName: {
    color: COLORS.primery,
  },

  textBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: scaleFontSize(14),
    color: COLORS.gray_text,
    lineHeight: scaleFontSize(20),
  },

  punktsBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  punkt: {
    fontSize: scaleFontSize(14),
    color: COLORS.gray_text,
    marginVertical: scaleWidth(5),
  },
})
