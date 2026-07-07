import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  modal: {},

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xxl,
  },
  fireworkWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firework: {
    width: theme.size.s300,
    height: theme.size.s300,
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
  btn: {
    marginTop: theme.spacing.xxxl,
    minWidth: theme.size.s180,
  },
}))
