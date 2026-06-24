import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },

  slidesWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: theme.size.s16,
    paddingBottom: theme.size.s24,
    backgroundColor: theme.colors.palette.transparent,
  },

  header: {
    paddingHorizontal: theme.size.s14,
    paddingVertical: theme.size.s8,
    marginBottom: theme.size.s16,
    borderRadius: theme.size.s999,
    backgroundColor: theme.colors.palette.card_alpha_88,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  count: {
    fontSize: theme.fontSize.s14,
    fontWeight: '600',
    color: theme.colors.palette.white,
  },

  empty: {
    width: '100%',
    marginTop: theme.size.s50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: theme.fontSize.s16,
    color: theme.colors.palette.white,
    fontWeight: '700',
    maxWidth: '80%',
    textAlign: 'center',
  },
  anim: {
    width: theme.size.s200,
    height: theme.size.s200,
  },

  footer: {
    width: '100%',
    alignItems: 'center',
    marginTop: theme.size.s20,
  },
  btns: {
    flexDirection: 'row',
    gap: theme.size.s20,
    marginBottom: theme.size.s20,
  },
  btnGroup: {
    minWidth: theme.size.s74,
    minHeight: theme.size.s74,
    padding: theme.size.s10,
    borderRadius: theme.size.s24,
  },
  btn: {
    minWidth: theme.size.s180,
    paddingVertical: theme.size.s16,
    backgroundColor: theme.colors.palette.primery,
    borderColor: theme.colors.palette.transparent,
  },
  textBtn: {
    textTransform: 'uppercase',
    fontSize: theme.fontSize.s16,
    fontWeight: '600',
    color: theme.colors.palette.black,
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  listWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
  },
  list: {
    flex: 1,
    width: '100%',
  },
}))
