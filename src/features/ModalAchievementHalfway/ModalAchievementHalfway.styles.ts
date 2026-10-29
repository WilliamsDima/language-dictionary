import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  modal: {},

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xxl,
  },
  badge: {
    width: theme.size.s120,
    height: theme.size.s120,
    borderRadius: theme.size.s999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  icon: {
    fontSize: theme.fontSize.s48,
  },
  eyebrow: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: theme.letterSpacing.s08,
  },
  title: {
    marginTop: theme.spacing.sm,
    fontSize: theme.fontSizes.xl,
    fontFamily: theme.fonts.extraBold,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  description: {
    marginTop: theme.spacing.sm,
    fontSize: theme.fontSizes.md,
    lineHeight: theme.lineHeights.lg,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  progressBlock: {
    marginTop: theme.spacing.xl,
    width: theme.size.s260,
    gap: theme.spacing.sm,
  },
  progressTrack: {
    height: theme.size.s12,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.border.default,
    overflow: 'hidden',
  },
  progressFill: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: theme.radius.pill,
    overflow: 'hidden',
  },
  progressGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text.primary,
  },
  remainingText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.secondary,
  },
  btn: {
    marginTop: theme.spacing.xxxl,
    minWidth: theme.size.s180,
  },
}))
