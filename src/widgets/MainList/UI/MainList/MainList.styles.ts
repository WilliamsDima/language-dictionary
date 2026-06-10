import { COLORS } from '@/assets/styles/colors'
import { height, scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  listWrapper: {
    width: '100%',
    flex: 1,
    minHeight: 0,
    alignItems: 'center',
    marginTop: 0,
  },
  list: {
    width: '100%',
    flex: 1,
    minHeight: 0,
  },
  columnWrapperStyle: {
    gap: scaleWidth(10),
    paddingBottom: scaleWidth(120),
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
    fontSize: scaleFontSize(12),
    color: COLORS.gray_text,
    textAlign: 'left',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: scaleWidth(12),
  },
  animLoader: {
    width: scaleWidth(150),
    height: scaleWidth(150),
  },
  emptyWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    paddingTop: scaleWidth(12),
    paddingBottom: scaleWidth(84),
  },
  empty: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scaleWidth(16),
    borderRadius: scaleWidth(22),
    backgroundColor: 'rgba(17, 39, 65, 0.82)',
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  emptyText: {
    fontSize: scaleFontSize(14),
    color: COLORS.white,
    fontWeight: '700',
    textAlign: 'center',
  },
  anim: {
    width: scaleWidth(132),
    height: scaleWidth(132),
  },
  scrollToTopBtn: {
    position: 'absolute',
    zIndex: 100,
    bottom: scaleWidth(126),
    right: scaleWidth(6),
    height: 44,
    width: 44,
    borderRadius: 14,
    backgroundColor: COLORS.surface_light,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
})
