import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flex: 1,
    width: '100%',
    gap: theme.size.s14,
  },

  cardTouchable: {
    flex: 1,
    width: '100%',
  },

  // карточка занимает всё свободное место; если слова не помещаются,
  // скроллится содержимое, а не сама карточка
  card: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: theme.colors.background.surface,
    borderRadius: theme.size.s28,
    borderWidth: theme.size.s2,
    borderColor: theme.colors.palette.border,
  },

  words: {
    flex: 1,
    width: '100%',
  },
  wordsContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.size.s10,
    gap: theme.size.s10,
  },

  description: {
    color: theme.colors.palette.gray_text,
    fontSize: theme.fontSize.s14,
    fontWeight: '600',
  },

  footer: {
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    minWidth: theme.size.s176,
    paddingVertical: theme.size.s16,
    backgroundColor: theme.colors.background.input,
  },
  btnText: {
    textAlign: 'center',
    fontSize: theme.fontSize.s16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
}))
