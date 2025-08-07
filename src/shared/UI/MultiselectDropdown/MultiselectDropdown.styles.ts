import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  title: {
    fontSize: scaleFontSize(14),
    marginBottom: scaleWidth(5),
  },

  dropdown: {
    height: 50,
    backgroundColor: COLORS.gray_text,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  containerStyle: {
    backgroundColor: COLORS.gray_text,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: -10,
    borderWidth: 0,
    maxHeight: '80%',
  },

  placeholderStyle: {
    fontSize: scaleFontSize(16),
    color: COLORS.black,
  },
  selectedTextStyle: {
    fontSize: scaleFontSize(14),
    color: COLORS.black,
  },
  selectedTextStyleActive: {
    color: COLORS.white,
  },
  inputSearchStyle: {
    height: scaleWidth(40),
    fontSize: scaleFontSize(16),
    borderColor: COLORS.black,
    borderRadius: scaleWidth(5),
  },
  iconStyle: {
    width: scaleWidth(20),
    height: scaleWidth(20),
  },

  item: {
    padding: scaleWidth(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemActive: {
    backgroundColor: COLORS.primery,
  },

  label: {
    fontSize: scaleFontSize(14),
    color: COLORS.white,
  },

  optionContainer: {
    position: 'absolute',
    zIndex: 100,
    top: scaleWidth(60),
    left: 0,
    backgroundColor: COLORS.dark_placeholder,
    width: '100%',
    borderBottomLeftRadius: scaleWidth(10),
    borderBottomRightRadius: scaleWidth(10),
    borderWidth: scaleWidth(1),
    borderColor: COLORS.dark_placeholder,
  },

  selectItem: {
    padding: scaleWidth(10),
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    width: scaleWidth(15),
    height: scaleWidth(15),
    borderRadius: scaleWidth(15 / 2),
    resizeMode: 'contain',
    marginRight: scaleWidth(5),
  },

  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: COLORS.primery,
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    fontSize: scaleFontSize(16),
    color: COLORS.white,
  },
})
