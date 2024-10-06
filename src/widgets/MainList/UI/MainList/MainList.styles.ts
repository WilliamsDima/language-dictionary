import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  listWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: scaleWidth(20),
  },
  list: {
    width: '100%',
  },
  columnWrapperStyle: {
    gap: scaleWidth(10),
  },
  loader: {
    marginTop: scaleWidth(50),
  },
  animLoader: {
    width: scaleWidth(150),
    height: scaleWidth(150),
  },
  empty: {
    width: '100%',
    marginTop: scaleWidth(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: scaleFontSize(16),
    color: COLORS.white,
    fontWeight: '700',
  },
  anim: {
    width: scaleWidth(200),
    height: scaleWidth(200),
  },
})
