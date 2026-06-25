import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme, rt) => ({
  screen: {
    paddingHorizontal: theme.layout.appPadding,
    flex: 1,
    gap: theme.size.s18,
    paddingTop: rt.insets.top + theme.size.s12,
    paddingBottom: rt.insets.bottom + theme.size.s12,
  },
  heroCard: {
    borderRadius: theme.size.s32,
    padding: theme.size.s20,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  heroCopy: {
    maxWidth: '72%',
  },
  badge: {
    color: theme.colors.palette.primery,
    fontSize: theme.fontSize.s12,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-Bold',
    marginBottom: theme.size.s10,
  },
  subtitle: {
    fontSize: theme.fontSize.s14,
    lineHeight: theme.fontSize.s20,
    color: theme.colors.palette.gray_text,
    marginTop: theme.size.s10,
  },
  heroVisual: {
    position: 'absolute',
    right: theme.size.s12,
    bottom: theme.size.s12,
  },
  heroImage: {
    width: theme.size.s112,
    height: theme.size.s112,
    resizeMode: 'contain',
  },
  mascotWrapper: {
    flex: 1,
  },
  mascotImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  placeholderText: {
    color: theme.colors.text.primary,
    fontSize: theme.fontSize.s14,
    fontFamily: 'Mulish-ExtraBold',
    textAlign: 'center',
  },

  iconSelect: {
    width: theme.size.s40,
    height: theme.size.s40,
    borderRadius: theme.size.s40 / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: theme.fontSize.s28,
    lineHeight: theme.fontSize.s34,
    marginTop: theme.size.s2,
    fontFamily: 'Mulish-ExtraBold',
  },

  controlsCard: {
    flexDirection: 'column',
    gap: theme.size.s20,
    width: '100%',
    borderRadius: theme.size.s28,
    padding: theme.size.s18,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  controlsTitle: {
    fontSize: theme.fontSize.s16,
    fontFamily: 'Mulish-Bold',
  },
  selector: {
    minHeight: theme.size.s82,
    borderRadius: theme.size.s24,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    backgroundColor: theme.colors.palette.surface_light,
    paddingHorizontal: theme.size.s12,
    paddingVertical: theme.size.s12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.size.s12,
  },
  selectorFlag: {
    width: theme.size.s62,
    height: theme.size.s62,
    borderRadius: theme.size.s20,
    backgroundColor: theme.colors.palette.surface_light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorCopy: {
    flex: 1,
    gap: theme.size.s2,
  },
  selectorLabel: {
    fontSize: theme.fontSize.s11,
    color: theme.colors.palette.gray_text,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-Bold',
  },
  selectorValue: {
    fontSize: theme.fontSize.s18,
    fontFamily: 'Mulish-ExtraBold',
    color: theme.colors.text.primary,
  },
  selectorHint: {
    fontSize: theme.fontSize.s13,
    color: theme.colors.palette.gray_text,
  },
  selectorFallback: {
    fontSize: theme.fontSize.s28,
  },
  selectorAction: {
    width: theme.size.s36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorLoader: {
    transform: [{ scale: 0.9 }],
  },
  selectorFootnote: {
    marginTop: theme.size.s4,
    fontSize: theme.fontSize.s12,
    color: theme.colors.palette.gray_text,
  },

  sheetList: {
    gap: theme.size.s10,
    paddingBottom: theme.size.s20,
  },
  sheetItem: {
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
  sheetItemActive: {
    borderColor: theme.colors.palette.success_alpha_36,
    backgroundColor: theme.colors.palette.success_alpha_12,
  },
  sheetItemFlag: {
    width: theme.size.s44,
    height: theme.size.s44,
    borderRadius: theme.size.s22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.palette.surface_light,
    overflow: 'hidden',
  },
  sheetItemCopy: {
    flex: 1,
  },
  sheetItemName: {
    fontSize: theme.fontSize.s16,
    fontFamily: 'Mulish-Bold',
    color: theme.colors.text.primary,
  },
  sheetItemNameActive: {
    color: theme.colors.palette.primery,
  },
  sheetItemHint: {
    marginTop: theme.size.s2,
    fontSize: theme.fontSize.s12,
    color: theme.colors.palette.gray_text,
  },
  sheetItemMeta: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: theme.size.s40,
  },
  sheetItemCode: {
    fontSize: theme.fontSize.s11,
    color: theme.colors.palette.gray_text,
    fontFamily: 'Mulish-Bold',
    textTransform: 'uppercase',
  },
  sheetItemLoader: {
    marginTop: theme.size.s6,
  },
}))
