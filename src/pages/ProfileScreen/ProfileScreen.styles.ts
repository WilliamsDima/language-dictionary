import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  screen: {
    paddingHorizontal: theme.layout.appPadding,
    position: 'relative',
    justifyContent: 'flex-start',
    paddingBottom: theme.size.s24,
  },
  metaCard: {
    padding: theme.size.s16,
    borderRadius: theme.size.s20,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  metaLabel: {
    fontSize: theme.fontSize.s12,
    letterSpacing: theme.letterSpacing.s08,
    textTransform: 'uppercase',
    fontFamily: theme.fonts.bold,
    color: theme.colors.palette.gray_text,
  },
  metaValue: {
    marginTop: theme.size.s6,
    fontSize: theme.fontSize.s18,
    fontFamily: theme.fonts.extraBold,
    color: theme.colors.text.primary,
  },
  achievementsBlock: {
    marginTop: theme.size.s16,
    padding: theme.size.s16,
    borderRadius: theme.size.s20,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  achievementsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  achievementsTitle: {
    fontSize: theme.fontSize.s18,
    fontFamily: theme.fonts.extraBold,
    color: theme.colors.text.primary,
  },
  achievementsSubtitle: {
    marginTop: theme.size.s6,
    fontSize: theme.fontSize.s13,
    lineHeight: theme.lineHeights.sm,
    color: theme.colors.palette.gray_text,
  },
  achievementsArrowBtn: {
    width: theme.size.s42,
    height: theme.size.s42,
    borderRadius: theme.size.s14,
    backgroundColor: theme.colors.palette.surface_light,
    borderColor: theme.colors.palette.border,
  },
  achievementsArrow: {
    transform: [{ rotate: '90deg' }],
  },
  achievementsList: {
    gap: theme.size.s10,
    paddingTop: theme.size.s14,
  },
  achievementPreviewCard: {
    width: theme.size.s132,
    height: theme.size.s170,
    borderRadius: theme.size.s20,
    padding: theme.size.s14,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  achievementPreviewBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.size.s8,
    paddingVertical: theme.size.s4,
    borderRadius: theme.size.s999,
    backgroundColor: theme.colors.palette.white_alpha_04,
  },
  achievementPreviewBadgeText: {
    fontSize: theme.fontSize.s10,
    fontFamily: theme.fonts.bold,
    color: theme.colors.palette.black,
    textTransform: 'uppercase',
  },
  achievementPreviewTitle: {
    fontSize: theme.fontSize.s16,
    lineHeight: theme.lineHeights.md,
    fontFamily: theme.fonts.extraBold,
    color: theme.colors.palette.black,
  },
  logout: {
    marginTop: theme.size.s14,
    padding: theme.size.s14,
    backgroundColor: theme.colors.palette.red,
    borderColor: theme.colors.palette.transparent,
  },

  repeatBtn: {
    marginTop: theme.size.s14,
    padding: theme.size.s14,
    backgroundColor: theme.colors.palette.primery,
    borderColor: theme.colors.palette.transparent,
  },

  repeatText: {
    fontSize: theme.fontSize.s13,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-ExtraBold',
    color: theme.colors.palette.black,
  },
  dangerText: {
    fontSize: theme.fontSize.s13,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-ExtraBold',
    color: theme.colors.base.white,
  },
  deleteText: {
    fontSize: theme.fontSize.s13,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-ExtraBold',
    color: theme.colors.palette.red,
  },

  delete: {
    marginTop: theme.size.s14,
    padding: theme.size.s14,
    borderColor: theme.colors.palette.red,
  },
}))
