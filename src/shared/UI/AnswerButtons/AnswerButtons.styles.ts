import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    gap: theme.size.s12,
  },

  // answer — уже выбранный ответ по карточке (повторное нажатие перезапишет)
  btnDontRemember: {
    flex: 1,
    paddingVertical: theme.size.s16,
    backgroundColor: theme.colors.palette.danger_alpha_16,
    borderWidth: theme.size.s2,
    borderColor: theme.colors.palette.transparent,
    variants: {
      answer: {
        dont_remember: {
          borderColor: theme.colors.palette.red,
        },
      },
    },
  },
  btnRemember: {
    flex: 1,
    paddingVertical: theme.size.s16,
    backgroundColor: theme.colors.palette.success_alpha_16,
    borderWidth: theme.size.s2,
    borderColor: theme.colors.palette.transparent,
    variants: {
      answer: {
        remember: {
          borderColor: theme.colors.palette.green,
        },
      },
    },
  },

  textDontRemember: {
    textAlign: 'center',
    fontSize: theme.fontSize.s16,
    fontWeight: '600',
    color: theme.colors.palette.red,
  },
  textRemember: {
    textAlign: 'center',
    fontSize: theme.fontSize.s16,
    fontWeight: '600',
    color: theme.colors.palette.green,
  },
}))
