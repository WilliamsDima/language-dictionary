import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  title: {
    fontSize: scaleFontSize(14),
    marginBottom: scaleWidth(5),
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: scaleWidth(1),
    borderColor: COLORS.dark_placeholder,
    borderRadius: scaleWidth(10),
    padding: scaleWidth(10),
    justifyContent: 'space-between',
  },
  btnOpen: {
    backgroundColor: COLORS.dark_placeholder,
  },
  label: {
    fontSize: scaleFontSize(14),
  },
  labelActive: {
    color: COLORS.green,
  },

  optionContainer: {
    position: 'absolute',
    zIndex: 10,
    bottom: scaleWidth(-10),
    left: 0,
    backgroundColor: COLORS.dark_placeholder,
    width: '100%',

    borderBottomLeftRadius: scaleWidth(10),
    borderBottomRightRadius: scaleWidth(10),
    borderWidth: scaleWidth(1),
    borderColor: COLORS.dark_placeholder,
  },
  optionContainerEmpty: {
    bottom: scaleWidth(-30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmptyOptions: {
    fontSize: scaleFontSize(12),
    color: COLORS.gray_text,
  },

  selectItem: {
    padding: scaleWidth(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  done: {
    width: scaleWidth(25),
    height: scaleWidth(25),
    borderRadius: scaleWidth(5),
    borderWidth: scaleWidth(1),
    borderColor: COLORS.white,
    marginRight: scaleWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneActive: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
})
