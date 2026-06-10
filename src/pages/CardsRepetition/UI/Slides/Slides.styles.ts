import { COLORS } from '@/assets/styles/colors'
import { height, scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    height: height,
    maxHeight: height,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  slidesWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    maxHeight: height,
    //position: 'absolute',
    zIndex: 100,
    backgroundColor: 'transparent',
  },

  header: {
    position: 'absolute',
    zIndex: 1000,
    top: scaleWidth(16),
    paddingHorizontal: scaleWidth(14),
    paddingVertical: scaleWidth(8),
    borderRadius: scaleWidth(999),
    backgroundColor: 'rgba(17, 39, 65, 0.88)',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  count: {
    fontSize: scaleFontSize(14),
    fontWeight: '600',
    color: COLORS.white,
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
    maxWidth: '80%',
    textAlign: 'center',
  },
  anim: {
    width: scaleWidth(200),
    height: scaleWidth(200),
  },

  footer: {
    position: 'absolute',
    zIndex: 1000,
    bottom: scaleWidth(110),
    width: '100%',
    alignItems: 'center',
  },
  btns: {
    flexDirection: 'row',
    gap: scaleWidth(20),
    marginBottom: scaleWidth(20),
  },
  btnGroup: {
    minWidth: scaleWidth(74),
    minHeight: scaleWidth(74),
    padding: scaleWidth(10),
    borderRadius: scaleWidth(24),
  },
  btn: {
    minWidth: scaleWidth(180),
    paddingVertical: scaleWidth(16),
    backgroundColor: COLORS.primery,
    borderColor: 'transparent',
  },
  textBtn: {
    textTransform: 'uppercase',
    fontSize: scaleFontSize(16),
    fontWeight: '600',
    color: COLORS.black,
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
