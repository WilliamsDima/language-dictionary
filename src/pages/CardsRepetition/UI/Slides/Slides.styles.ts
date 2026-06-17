import { height } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    height: height,
    maxHeight: height,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  slidesWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    maxHeight: height,
    //position: 'absolute',
    zIndex: 100,
    backgroundColor: theme.colors.palette.transparent,
  },

  header: {
    position: 'absolute',
    zIndex: 1000,
    top: theme.size.s16,
    paddingHorizontal: theme.size.s14,
    paddingVertical: theme.size.s8,
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
    position: 'absolute',
    zIndex: 1000,
    bottom: theme.size.s110,
    width: '100%',
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
}))