import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  card: {
    width: theme.size.s132,
    height: theme.size.s170,
    borderRadius: theme.size.s20,
    padding: theme.size.s14,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.palette.dark_alpha_30,
  },
  icon: {
    fontSize: theme.fontSize.s28,
  },
  footer: {
    gap: theme.size.s8,
  },
  title: {
    fontSize: theme.fontSize.s16,
    lineHeight: theme.lineHeights.md,
    fontFamily: theme.fonts.extraBold,
    color: theme.colors.palette.black,
    variants: {
      unlocked: {
        false: {
          opacity: theme.opacity.o60,
        },
      },
    },
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.size.s8,
    paddingVertical: theme.size.s4,
    borderRadius: theme.size.s999,
    backgroundColor: theme.colors.palette.white_alpha_04,
  },
  badgeText: {
    fontSize: theme.fontSize.s10,
    fontFamily: theme.fonts.bold,
    color: theme.colors.palette.black,
    textTransform: 'uppercase',
  },
}))
