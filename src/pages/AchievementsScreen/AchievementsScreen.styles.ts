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
  loader: {
    height: theme.size.s200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animLoader: {
    width: theme.size.s150,
    height: theme.size.s150,
  },
  errorBlock: {
    marginTop: theme.size.s16,
    padding: theme.size.s18,
    borderRadius: theme.size.s24,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    alignItems: 'center',
    gap: theme.size.s12,
  },
  errorText: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.palette.gray_text,
    lineHeight: theme.lineHeights.md,
    textAlign: 'center',
  },
  retryBtn: {
    minWidth: theme.size.s150,
  },
}))
