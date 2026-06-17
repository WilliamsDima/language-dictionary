
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  title: {
    fontSize: theme.fontSize.s14,
    marginBottom: theme.size.s8,
    color: theme.colors.palette.gray_text,
  },

  dropdown: {
    minHeight: theme.size.s50,
    backgroundColor: theme.colors.palette.surface,
    borderRadius: theme.size.s16,
    padding: theme.size.s10,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },

  containerStyle: {
    backgroundColor: theme.colors.palette.surface_light,
    borderRadius: theme.size.s16,
    marginTop: theme.size.s8,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    overflow: 'hidden',
  },

  placeholderStyle: {
    fontSize: theme.fontSize.s16,
    color: theme.colors.palette.dark_placeholder,
  },
  selectedTextStyle: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.palette.white,
  },
  selectedTextStyleActive: {
    color: theme.colors.palette.white,
  },
  inputSearchStyle: {
    height: theme.size.s40,
    fontSize: theme.fontSize.s16,
    borderColor: theme.colors.palette.border,
    borderRadius: theme.size.s5,
    color: theme.colors.palette.white,
    backgroundColor: theme.colors.palette.gray_bg_btn,
  },
  iconStyle: {
    width: theme.size.s20,
    height: theme.size.s20,
  },
  iconValue: {
    marginRight: theme.size.s10,
  },

  item: {
    padding: theme.size.s14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.size.s10,
  },
  itemActive: {
    backgroundColor: theme.colors.palette.primery,
  },

  label: {},

  optionContainer: {
    position: 'absolute',
    zIndex: 100,
    top: theme.size.s60,
    left: theme.size.s0,
    backgroundColor: theme.colors.palette.dark_placeholder,
    width: '100%',
    borderBottomLeftRadius: theme.size.s10,
    borderBottomRightRadius: theme.size.s10,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.dark_placeholder,
  },

  selectItem: {
    padding: theme.size.s10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    width: theme.size.s15,
    height: theme.size.s15,
    borderRadius: theme.size.s15 / 2,
    resizeMode: 'contain',
    marginRight: theme.size.s5,
  },

  selectedStyle: {
    backgroundColor: theme.colors.palette.primery,
  },
  textSelectedStyle: {
    fontSize: theme.fontSize.s16,
    color: theme.colors.palette.white,
  },
  loader: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: theme.size.s50,
    backgroundColor: theme.colors.palette.bg_modal,
    borderRadius: theme.size.s16,
  },
}))