import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  modal: {},

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xxl,
  },
  emoji: {
    width: theme.size.s100,
    height: theme.size.s100,
    marginBottom: theme.spacing.md,
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
  title: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSizes.xl,
    fontFamily: theme.fonts.extraBold,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  // мотивация «скоро заморозка» — в «ледяных» цветах, как и всё, что
  // связано с заморозками серии
  motivation: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.xl,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.streak.frozenGlow,
    backgroundColor: theme.colors.palette.info_alpha_16,
  },
  motivationIcon: {
    fontSize: theme.fontSizes.lg,
  },
  motivationText: {
    flexShrink: 1,
    fontSize: theme.fontSizes.sm,
    lineHeight: theme.lineHeights.md,
    fontFamily: theme.fonts.bold,
    color: theme.colors.streak.frozen,
  },
  btn: {
    marginTop: theme.spacing.xxxl,
    minWidth: theme.size.s180,
  },
}))
