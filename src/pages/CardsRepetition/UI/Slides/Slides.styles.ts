import { COLORS } from '@/assets/styles/colors'
import { height, scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  slidesWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    position: 'absolute',
    zIndex: 100,
    backgroundColor: 'transparent',
  },

  header: {
    position: 'absolute',
    zIndex: 1000,
    top: scaleWidth(10),
  },
  count: {
    fontSize: scaleFontSize(14),
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    zIndex: 1000,
    bottom: scaleWidth(40),
  },
  btns: {
    flexDirection: 'row',
    gap: scaleWidth(20),
    marginBottom: scaleWidth(20),
  },
  btnGroup: {
    //backgroundColor: 'transparent',
    padding: scaleWidth(10),
  },
  btn: {
    padding: scaleWidth(10),
    backgroundColor: COLORS.primery,
  },
  textBtn: {
    textTransform: 'uppercase',
    fontSize: scaleFontSize(16),
    fontWeight: '600',
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
