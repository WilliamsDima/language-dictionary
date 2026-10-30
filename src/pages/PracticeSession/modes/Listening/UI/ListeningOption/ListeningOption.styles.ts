import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  // state — состояние варианта (ListeningOptionState)
  option: {
    width: '100%',
    minHeight: theme.size.s56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.size.s10,
    paddingVertical: theme.size.s8,
    borderRadius: theme.size.s20,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s2,
    borderColor: theme.colors.palette.border,
    variants: {
      state: {
        idle: {},
        correct: {
          borderColor: theme.colors.palette.green,
          backgroundColor: theme.colors.palette.success_alpha_16,
        },
        wrong: {
          borderColor: theme.colors.palette.red,
          backgroundColor: theme.colors.palette.danger_alpha_16,
        },
      },
    },
  },

  text: {
    textAlign: 'center',
    fontSize: theme.fontSize.s16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
}))
