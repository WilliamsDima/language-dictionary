import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  title: {
    fontSize: theme.fontSize.s14,
    marginBottom: theme.size.s8,
    color: theme.colors.palette.gray_text,
  },

  dropdown: {
    minHeight: theme.size.s56,
    backgroundColor: theme.colors.palette.surface,
    borderRadius: theme.size.s16,
    paddingHorizontal: theme.size.s16,
    paddingVertical: theme.size.s14,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },

  containerStyle: {
    backgroundColor: theme.colors.palette.surface_light,
    borderRadius: theme.size.s24,
    marginTop: theme.size.s8,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    maxHeight: '80%',
    overflow: 'hidden',
    padding: theme.size.s8,
  },

  placeholderStyle: {
    fontSize: theme.fontSize.s16,
    color: theme.colors.palette.dark_placeholder,
  },
  selectedTextStyle: {
    fontSize: theme.fontSize.s16,
    color: theme.colors.palette.white,
    lineHeight: theme.lineHeights.md,
  },
  selectedTextStyleActive: {
    color: theme.colors.palette.black,
  },
  inputSearchStyle: {
    height: theme.size.s48,
    fontSize: theme.fontSize.s16,
    lineHeight: theme.lineHeights.md,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    borderRadius: theme.size.s14,
    color: theme.colors.palette.white,
    backgroundColor: theme.colors.palette.surface,
    paddingHorizontal: theme.size.s14,
    margin: theme.size.s0,
    marginBottom: theme.size.s10,
  },
  iconStyle: {
    width: theme.size.s20,
    height: theme.size.s20,
  },

  item: {
    padding: theme.size.s12,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.size.s14,
  },
  itemContainer: {
    borderRadius: theme.size.s14,
    overflow: 'hidden',
    marginBottom: theme.size.s6,
    marginHorizontal: theme.size.s4,
  },
  itemActive: {
    backgroundColor: theme.colors.palette.primery,
  },

  label: {
    fontSize: theme.fontSize.s16,
    color: theme.colors.palette.white,
  },

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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.size.s14,
    backgroundColor: theme.colors.palette.surface_light,
    marginTop: theme.size.s8,
    marginRight: theme.size.s12,
    paddingHorizontal: theme.size.s12,
    paddingVertical: theme.size.s8,
  },
  textSelectedStyle: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.palette.white,
    lineHeight: theme.lineHeights.sm,
  },
}))
