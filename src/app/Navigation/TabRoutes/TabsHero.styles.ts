import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  hero: {
    marginHorizontal: theme.layout.appPadding,
    marginBottom: theme.size.s12,
    borderRadius: theme.size.s22,
    padding: theme.size.s14,
    backgroundColor: theme.colors.palette.card_alpha_92,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  heroCopy: {
    flex: 1,
    paddingRight: theme.size.s12,
  },
  heroKicker: {
    fontSize: theme.fontSize.s10,
    color: theme.colors.palette.blue,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-Bold',
    marginBottom: theme.size.s8,
  },
  heroTitle: {
    fontSize: theme.fontSize.s18,
    fontFamily: 'Mulish-ExtraBold',
  },
  heroPlaceholder: {
    width: theme.size.s68,
    height: theme.size.s68,
    borderRadius: theme.radius.pill,
    borderWidth: theme.size.s2,
    borderColor: theme.colors.palette.gradient_blue,
    backgroundColor: theme.colors.palette.blue_navy,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroGradientRotator: {
    position: 'absolute',
    // larger than container (68 * √2 ≈ 96) to fill the circle during rotation
    width: 96,
    height: 96,
  },
  heroGradient: {
    flex: 1,
  },
  heroPlaceholderText: {
    color: theme.colors.palette.white,
    fontSize: theme.fontSize.s14,
    fontFamily: 'Mulish-ExtraBold',
  },
  heroAvatar: {
    width: theme.size.s58,
    height: theme.size.s58,
    borderRadius: theme.radius.pill,
  },
}))
