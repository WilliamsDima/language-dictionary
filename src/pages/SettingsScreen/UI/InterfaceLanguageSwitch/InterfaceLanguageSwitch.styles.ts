import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.size.s8,
  },
  title: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.palette.gray_text,
  },
  trigger: {
    minHeight: theme.size.s56,
    backgroundColor: theme.colors.background.surface,
    borderRadius: theme.size.s16,
    paddingHorizontal: theme.size.s16,
    paddingVertical: theme.size.s14,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.size.s10,
  },
  flag: {
    width: theme.size.s28,
    height: theme.size.s28,
    borderRadius: theme.size.s28 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.colors.palette.surface_light,
  },
  flagFallback: {
    fontSize: theme.fontSize.s20,
  },
  value: {
    flex: 1,
    fontSize: theme.fontSize.s16,
    color: theme.colors.text.primary,
    lineHeight: theme.lineHeights.md,
  },
}))
