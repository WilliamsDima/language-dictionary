import { COLORS } from '@/assets/styles/colors'
import { height, scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet, NativeModules } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    height: height + NativeModules?.StatusBarManager?.HEIGHT || 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bg_modal,
    width: '100%',
  },
  container: {
    maxWidth: '95%',
    minWidth: '90%',
    backgroundColor: COLORS.white,
    paddingVertical: scaleWidth(20),
    borderRadius: scaleWidth(10),
    alignItems: 'center',
  },

  wrapperContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scroll: {
    maxHeight: '90%',
    width: '100%',
  },

  title: {
    color: COLORS.green,
    fontSize: scaleFontSize(16),
    textAlign: 'center',
    marginBottom: scaleWidth(20),
    textTransform: 'uppercase',
  },

  inputs: {
    gap: scaleWidth(10),
    paddingHorizontal: scaleWidth(10),
  },

  input: {
    maxHeight: scaleWidth(100),
    height: 'auto',
    backgroundColor: COLORS.gray_text,
  },

  btns: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scaleWidth(10),
  },

  footer: {
    marginTop: scaleWidth(20),
    paddingHorizontal: scaleWidth(10),
    paddingTop: scaleWidth(20),
    borderTopWidth: scaleWidth(1),
    borderTopColor: COLORS.gray_text,
  },

  selectLang: {
    marginTop: scaleWidth(10),
  },
})
