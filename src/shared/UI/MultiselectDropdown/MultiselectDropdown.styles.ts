import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  title: {
    fontSize: scaleFontSize(14),
    marginBottom: scaleWidth(8),
    color: COLORS.gray_text,
  },

  dropdown: {
    height: 50,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  containerStyle: {
    backgroundColor: COLORS.surface_light,
    borderRadius: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    maxHeight: '80%',
  },

  placeholderStyle: {
    fontSize: scaleFontSize(16),
    color: COLORS.dark_placeholder,
  },
  selectedTextStyle: {
    fontSize: scaleFontSize(14),
    color: COLORS.white,
  },
  selectedTextStyleActive: {
    color: COLORS.white,
  },
  inputSearchStyle: {
    height: scaleWidth(40),
    fontSize: scaleFontSize(16),
    borderColor: COLORS.border,
    borderRadius: scaleWidth(5),
    color: COLORS.white,
    backgroundColor: COLORS.gray_bg_btn,
  },
  iconStyle: {
    width: scaleWidth(20),
    height: scaleWidth(20),
  },

  item: {
    padding: scaleWidth(12),
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
    backgroundColor: COLORS.surface_light,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textSelectedStyle: {
    fontSize: scaleFontSize(14),
    color: COLORS.white,
  },
})
