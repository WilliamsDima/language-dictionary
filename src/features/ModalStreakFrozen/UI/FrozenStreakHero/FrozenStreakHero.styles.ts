import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: 'center',
  },
  snowflake: {
    fontSize: theme.fontSize.s48,
    lineHeight: theme.size.s62,
    marginBottom: theme.spacing.lg,
  },
  block: {
    minWidth: theme.size.s150,
    height: theme.size.s100,
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ice: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: theme.radius.xl,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.streak.frozenLight,
    overflow: 'hidden',
  },
  iceGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  shimmer: {
    position: 'absolute',
    top: -theme.size.s50,
    bottom: -theme.size.s50,
    left: 0,
    width: theme.size.s32,
    backgroundColor: theme.colors.streak.frozenLight,
    opacity: theme.opacity.o60,
  },
  number: {
    fontSize: theme.fontSize.s48,
    fontFamily: theme.fonts.extraBold,
    textShadowColor: theme.colors.streak.frozenGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: theme.size.s12,
  },
}))
