import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  modal: {},

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xxl,
  },
  frost: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    marginTop: theme.spacing.xl,
    fontSize: theme.fontSizes.xl,
    fontFamily: theme.fonts.extraBold,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: theme.spacing.sm,
    fontSize: theme.fontSizes.md,
    lineHeight: theme.lineHeights.lg,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  summary: {
    marginTop: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.pill,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.streak.frozenGlow,
    backgroundColor: theme.colors.palette.info_alpha_16,
  },
  summaryText: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.bold,
    color: theme.colors.streak.frozen,
    textAlign: 'center',
  },
  btn: {
    marginTop: theme.spacing.xxxl,
    minWidth: theme.size.s180,
  },
}))
