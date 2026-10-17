import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  status: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.xl,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.streak.frozenGlow,
    backgroundColor: theme.colors.palette.info_alpha_16,
  },
  statusValue: {
    fontSize: theme.fontSize.s30,
    fontFamily: theme.fonts.extraBold,
    color: theme.colors.streak.frozen,
  },
  statusCaption: {
    marginTop: theme.spacing.xs,
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  statusHint: {
    marginTop: theme.spacing.xs,
    fontSize: theme.fontSizes.sm,
    lineHeight: theme.lineHeights.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  rules: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  rule: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  ruleIcon: {
    width: theme.size.s24,
    fontSize: theme.fontSizes.md,
    lineHeight: theme.lineHeights.md,
    textAlign: 'center',
  },
  ruleText: {
    flex: 1,
    fontSize: theme.fontSizes.sm,
    lineHeight: theme.lineHeights.md,
    color: theme.colors.text.primary,
  },
  btn: {
    marginTop: theme.size.s20,
    paddingVertical: theme.size.s12,
    backgroundColor: theme.colors.palette.primery,
    borderColor: theme.colors.palette.transparent,
    borderRadius: theme.size.s16,
  },
  textBtn: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: theme.fontSize.s13,
    color: theme.colors.base.black,
  },
}))
