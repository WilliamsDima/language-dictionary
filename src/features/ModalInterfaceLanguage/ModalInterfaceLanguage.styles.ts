import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  list: {
    gap: theme.size.s10,
    paddingBottom: theme.size.s20,
  },
  item: {
    paddingHorizontal: theme.size.s14,
    paddingVertical: theme.size.s12,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    borderRadius: theme.size.s20,
    backgroundColor: theme.colors.background.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.size.s12,
  },
  itemActive: {
    borderColor: theme.colors.palette.success_alpha_36,
    backgroundColor: theme.colors.palette.success_alpha_12,
  },
  itemFlag: {
    width: theme.size.s44,
    height: theme.size.s44,
    borderRadius: theme.size.s22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.palette.surface_light,
    overflow: 'hidden',
  },
  itemCopy: {
    flex: 1,
  },
  itemName: {
    fontSize: theme.fontSize.s16,
    fontFamily: 'Mulish-Bold',
    color: theme.colors.text.primary,
  },
  itemNameActive: {
    color: theme.colors.palette.primery,
  },
  itemHint: {
    marginTop: theme.size.s2,
    fontSize: theme.fontSize.s12,
    color: theme.colors.palette.gray_text,
  },
  itemMeta: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: theme.size.s40,
  },
  itemCode: {
    fontSize: theme.fontSize.s11,
    color: theme.colors.palette.gray_text,
    fontFamily: 'Mulish-Bold',
    textTransform: 'uppercase',
  },
  itemLoader: {
    marginTop: theme.size.s6,
  },
}))
