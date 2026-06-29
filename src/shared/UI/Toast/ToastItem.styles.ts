import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'absolute',
    left: theme.size.s12,
    right: theme.size.s12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.size.s10,
    padding: theme.size.s10,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.background.surface,
    borderColor: theme.colors.palette.border,
    borderLeftWidth: theme.size.s8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 12,
    variants: {
      type: {
        error: {
          borderLeftColor: theme.colors.action.danger,
        },
        success: {
          borderLeftColor: theme.colors.action.primary,
        },
      },
    },
  },
  message: {
    flex: 1,
    lineHeight: theme.lineHeights.sm,
  },
}))
