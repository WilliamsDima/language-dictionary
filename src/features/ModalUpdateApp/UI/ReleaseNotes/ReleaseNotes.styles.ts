import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme, rt) => ({
  wrapper: {
    marginTop: theme.size.s14,
    gap: theme.size.s6,
  },
  title: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.text.primary,
    fontFamily: 'Mulish-Bold',
  },
  // длинный список не раздувает шторку выше экрана (иначе кнопки уезжают
  // за её нижний край) — пункты прокручиваются внутри ограниченной области,
  // короткий список занимает ровно свою высоту
  scroll: {
    flexGrow: 0,
    maxHeight: rt.screen.height / 3,
  },
  list: {
    gap: theme.size.s6,
  },
  item: {
    flexDirection: 'row',
    gap: theme.size.s8,
  },
  bullet: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.palette.primery,
  },
  text: {
    flex: 1,
    fontSize: theme.fontSize.s14,
    color: theme.colors.text.secondary,
  },
}))
