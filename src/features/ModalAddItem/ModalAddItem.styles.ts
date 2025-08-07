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
    minWidth: '90%',
    maxHeight: '90%',
    minHeight: '90%',
    backgroundColor: COLORS.white,
    paddingTop: scaleWidth(10),
    borderRadius: scaleWidth(10),
    alignItems: 'center',
  },

  wrapperContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scroll: {
    maxHeight: '95%',
    minWidth: '100%',
  },

  title: {
    color: COLORS.primery,
    fontSize: scaleFontSize(16),
    textAlign: 'center',
    marginBottom: scaleWidth(20),
    textTransform: 'uppercase',
  },
  btnWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: scaleWidth(20),
  },
  btnAddItem: {
    width: '100%',
    alignItems: 'center',
  },

  input: {
    maxHeight: scaleWidth(100),
    height: 'auto',
    backgroundColor: COLORS.gray_text,
    color: COLORS.black,
  },

  btns: {
    maxWidth: '100%',
    minWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(20),
    marginTop: scaleWidth(10),
    marginBottom: scaleWidth(20),
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
