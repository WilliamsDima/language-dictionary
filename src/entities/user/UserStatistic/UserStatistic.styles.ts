import { height, width } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    marginTop: theme.size.s20,
  },

  title: {
    fontSize: theme.fontSize.s18,
    fontFamily: theme.fonts.extraBold,
    color: theme.colors.text.primary,
    marginBottom: theme.size.s12,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.size.s10,
  },

  statCard: {
    width: '48.5%',
    minHeight: theme.size.s110,
    padding: theme.size.s14,
    borderRadius: theme.size.s20,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.white_alpha_06,
    overflow: 'hidden',
    position: 'relative',
  },
  statCardGlow: {
    position: 'absolute',
    top: -theme.size.s32,
    right: -theme.size.s12,
    width: theme.size.s84,
    height: theme.size.s84,
    borderRadius: theme.size.s84,
    backgroundColor: theme.colors.palette.white_alpha_06,
  },
  statCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statCardDot: {
    width: theme.size.s8,
    height: theme.size.s8,
    borderRadius: theme.size.s8,
    backgroundColor: theme.colors.base.white,
    opacity: theme.opacity.o60,
  },
  statCardCaption: {
    marginLeft: theme.size.s6,
    fontSize: theme.fontSize.s10,
    letterSpacing: theme.letterSpacing.s08,
    textTransform: 'uppercase',
    color: theme.colors.base.white,
    fontFamily: theme.fonts.bold,
  },
  statCardValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.size.s14,
    gap: theme.size.s6,
  },
  statCardValue: {
    fontSize: theme.fontSize.s24,
    fontFamily: theme.fonts.extraBold,
    color: theme.colors.palette.black,
  },
  streakIcon: {
    width: theme.size.s24,
    height: theme.size.s24,
  },
  streakEmoji: {
    fontSize: theme.fontSize.s20,
    lineHeight: theme.fontSize.s24,
  },
  statCardLabel: {
    marginTop: theme.size.s10,
    fontSize: theme.fontSize.s13,
    lineHeight: theme.lineHeights.sm,
    color: theme.colors.palette.black,
  },

  languagesSection: {
    marginTop: theme.size.s10,
    gap: theme.size.s10,
  },
  languageCard: {
    padding: theme.size.s14,
    borderRadius: theme.size.s20,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  languageCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageCardTitle: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.palette.gray_text,
    fontFamily: theme.fonts.bold,
  },
  languageCardContent: {
    marginTop: theme.size.s12,
  },
  languagesList: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.size.s8,
  },
  emptyText: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.palette.primery,
  },
  emptyTextDanger: {
    color: theme.colors.palette.red,
  },
  editBtn: {
    width: theme.size.s32,
    height: theme.size.s32,
    borderRadius: theme.size.s12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.palette.white_alpha_03,
  },

  loader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    zIndex: 10,
  },
  animLoader: {
    width: theme.size.s150,
    height: theme.size.s150,
  },
}))
