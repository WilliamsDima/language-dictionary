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
  btn: {
    marginTop: theme.spacing.xxxl,
    minWidth: theme.size.s180,
  },
}))
