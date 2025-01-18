import { COLORS } from '@/assets/styles/colors'
import { height, scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet, NativeModules } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    height: height + (NativeModules?.StatusBarManager?.HEIGHT || 0),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bg_modal,
    width: '100%',
  },
  container: {
    maxWidth: '90%',
    minWidth: '80%',
    maxHeight: '90%',
    backgroundColor: COLORS.white,
    paddingHorizontal: scaleWidth(20),
    borderRadius: scaleWidth(10),
  },

  wrapperContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scroll: {
    height: '100%',
  },

  title: {
    color: COLORS.primery,
    fontSize: scaleFontSize(16),
    textAlign: 'center',
    marginBottom: scaleWidth(20),
    textTransform: 'uppercase',
    marginTop: scaleWidth(20),
  },

  name: {
    color: COLORS.black,
    fontSize: scaleFontSize(14),
  },

  list: {
    gap: scaleWidth(10),
  },

  item: {
    padding: scaleWidth(5),
    borderWidth: scaleWidth(1),
    borderColor: COLORS.black,
    borderRadius: scaleWidth(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  isLast: {
    marginBottom: scaleWidth(20),
  },

  active: {
    borderColor: COLORS.primery,
  },
  icon: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    resizeMode: 'cover',
  },
})
