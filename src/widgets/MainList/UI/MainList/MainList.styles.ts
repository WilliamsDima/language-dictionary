import { COLORS } from '@/assets/styles/colors'
import { height, scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
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
    paddingBottom: scaleWidth(300),
  },
  loader: {
    bottom: scaleWidth(100),
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: scaleFontSize(14),
    color: COLORS.gray_text,
    textAlign: 'center',
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
  scrollToTopBtn: {
    position: 'absolute',
    zIndex: 100,
    top: height / 1.67,
    right: 0,
    flex: 1,
    height: 45,
    width: 45,
    borderRadius: 10,
    backgroundColor: COLORS.primery,
  },
})
