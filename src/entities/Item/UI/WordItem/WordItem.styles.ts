import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  item: {
    width: '100%',
    borderBottomWidth: scaleWidth(1),
    borderBottomColor: COLORS.dark_placeholder,
    paddingBottom: scaleWidth(5),
  },
  itemLast: {
    borderBottomWidth: scaleWidth(0),
    paddingBottom: scaleWidth(0),
  },
  wordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  index: {
    fontSize: scaleFontSize(14),
    color: COLORS.primery,
    marginBottom: scaleWidth(5),
  },
  word: {
    fontSize: scaleFontSize(16),
    color: COLORS.white,
  },
})
