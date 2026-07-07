import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
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
    borderColor: theme.colors.palette.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementsArrow: {
    transform: [{ rotate: '90deg' }],
  },
  achievementsList: {
    gap: theme.size.s10,
    paddingTop: theme.size.s14,
  },
}))
