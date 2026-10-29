import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.size.s14,
    padding: theme.size.s18,
    borderRadius: theme.size.s24,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.o60,
        },
      },
    },
  },
  icon: {
    fontSize: theme.fontSize.s34,
  },
  content: {
    flex: 1,
    gap: theme.size.s6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.size.s8,
  },
  title: {
    flexShrink: 1,
    fontSize: theme.fontSize.s18,
    fontFamily: theme.fonts.extraBold,
    color: theme.colors.text.primary,
  },
  badge: {
    paddingHorizontal: theme.size.s10,
    paddingVertical: theme.size.s4,
    borderRadius: theme.size.s999,
    backgroundColor: theme.colors.palette.info_alpha_16,
  },
  badgeText: {
    fontSize: theme.fontSize.s12,
    fontFamily: theme.fonts.bold,
    color: theme.colors.palette.blue,
  },
  description: {
    fontSize: theme.fontSize.s14,
    lineHeight: theme.lineHeights.md,
    color: theme.colors.text.secondary,
  },
  hint: {
    fontSize: theme.fontSize.s13,
    fontFamily: theme.fonts.bold,
    color: theme.colors.palette.item_study,
  },
}))
