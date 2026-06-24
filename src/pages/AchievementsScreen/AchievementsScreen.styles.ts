import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  screen: {
    paddingHorizontal: theme.layout.appPadding,
    paddingBottom: theme.size.s24,
  },
  hero: {
    padding: theme.size.s18,
    borderRadius: theme.size.s24,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  heroTitle: {
    fontSize: theme.fontSize.s20,
    fontFamily: theme.fonts.extraBold,
    color: theme.colors.text.primary,
  },
  heroText: {
    marginTop: theme.size.s8,
    fontSize: theme.fontSize.s14,
    color: theme.colors.palette.gray_text,
    lineHeight: theme.lineHeights.md,
  },
  list: {
    marginTop: theme.size.s16,
    gap: theme.size.s12,
  },
  card: {
    minHeight: theme.size.s160,
    padding: theme.size.s18,
    borderRadius: theme.size.s24,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.size.s10,
    paddingVertical: theme.size.s4,
    borderRadius: theme.size.s999,
    backgroundColor: theme.colors.palette.white_alpha_04,
  },
  badgeText: {
    fontSize: theme.fontSize.s12,
    fontFamily: theme.fonts.bold,
    color: theme.colors.palette.black,
    textTransform: 'uppercase',
  },
  cardTitle: {
    marginTop: theme.size.s24,
    fontSize: theme.fontSize.s20,
    fontFamily: theme.fonts.extraBold,
    color: theme.colors.palette.black,
  },
  cardText: {
    marginTop: theme.size.s10,
    fontSize: theme.fontSize.s14,
    lineHeight: theme.lineHeights.md,
    color: theme.colors.palette.black,
  },
}))
