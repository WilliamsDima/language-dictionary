import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  card: {
    minHeight: theme.size.s160,
    padding: theme.size.s18,
    borderRadius: theme.size.s24,
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
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: theme.fontSize.s34,
  },
  lockBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.size.s10,
    paddingVertical: theme.size.s4,
    borderRadius: theme.size.s999,
    backgroundColor: theme.colors.palette.white_alpha_04,
  },
  lockBadgeText: {
    fontSize: theme.fontSize.s12,
    fontFamily: theme.fonts.bold,
    color: theme.colors.palette.black,
  },
  cardTitle: {
    marginTop: theme.size.s24,
    fontSize: theme.fontSize.s20,
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
  cardText: {
    marginTop: theme.size.s10,
    fontSize: theme.fontSize.s14,
    lineHeight: theme.lineHeights.md,
    color: theme.colors.palette.black,
    variants: {
      unlocked: {
        false: {
          opacity: theme.opacity.o60,
        },
      },
    },
  },
  unlockedText: {
    marginTop: theme.size.s14,
    fontSize: theme.fontSize.s13,
    fontFamily: theme.fonts.bold,
    color: theme.colors.palette.black,
  },
  progressBlock: {
    marginTop: theme.size.s14,
    gap: theme.size.s6,
  },
  progressTrack: {
    height: theme.size.s8,
    borderRadius: theme.size.s999,
    backgroundColor: theme.colors.palette.white_alpha_04,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: theme.size.s999,
    backgroundColor: theme.colors.palette.black,
  },
  progressText: {
    fontSize: theme.fontSize.s12,
    fontFamily: theme.fonts.bold,
    color: theme.colors.palette.black,
  },
}))
