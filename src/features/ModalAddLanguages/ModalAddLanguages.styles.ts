import { COLORS } from '@/assets/styles/colors'
import { height, scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet, NativeModules } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bg_modal,
    width: '100%',
    height: height + (NativeModules?.StatusBarManager?.HEIGHT || 0),
  },

  wrapperContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    maxWidth: '90%',
    minWidth: '90%',
    width: '100%',
    height: height - 200,
    // maxHeight: '90%',
    backgroundColor: COLORS.white,
    paddingVertical: scaleWidth(20),
    borderRadius: scaleWidth(10),
    overflow: 'hidden',
    //paddingBottom: scaleWidth(40),
    alignItems: 'center',
  },

  scroll: {
    maxHeight: height - 300,
    width: '100%',
    paddingHorizontal: scaleWidth(10),
  },
  scrollContainer: {
    gap: scaleWidth(10),
    width: '100%',
  },

  title: {
    color: COLORS.primery,
    fontSize: scaleFontSize(16),
    textAlign: 'center',
    marginBottom: scaleWidth(20),
    textTransform: 'uppercase',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: scaleWidth(10),
    borderRadius: scaleWidth(5),
    borderWidth: scaleWidth(1),
    borderColor: COLORS.dark_placeholder,
  },
  itemActive: {
    borderColor: COLORS.primery,
  },
  itemActiveSingle: {
    backgroundColor: COLORS.primery,
  },
  done: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    borderRadius: scaleWidth(5),
    borderWidth: scaleWidth(1),
    borderColor: COLORS.dark_placeholder,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleWidth(10),
  },
  doneActive: {
    borderColor: COLORS.primery,
    backgroundColor: COLORS.primery,
  },
  full_name: {
    color: COLORS.black,
    fontSize: scaleFontSize(16),
    textAlign: 'center',
  },
  full_nameActive: {
    color: COLORS.white,
  },
  flag: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    resizeMode: 'cover',
    marginRight: scaleWidth(5),
  },

  btns: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleWidth(10),
    backgroundColor: COLORS.white,
  },

  // footer: {
  //   marginTop: scaleWidth(20),
  //   paddingHorizontal: scaleWidth(10),
  //   paddingTop: scaleWidth(20),
  //   borderTopWidth: scaleWidth(1),
  //   borderTopColor: COLORS.gray_text,
  // },

  selectLang: {
    marginTop: scaleWidth(10),
  },
})
