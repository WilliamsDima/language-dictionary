import { height } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  listWrapper: {
    width: '100%',
    flex: 1,
    minHeight: theme.size.s0,
    alignItems: 'center',
    marginTop: theme.size.s0,
  },
  list: {
    width: '100%',
    flex: 1,
    minHeight: theme.size.s0,
  },
  columnWrapperStyle: {
    gap: theme.size.s10,
    paddingBottom: theme.size.s120,
  },
  loader: {
    bottom: theme.size.s100,
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: theme.fontSize.s12,
    color: theme.colors.palette.gray_text,
    textAlign: 'left',
    textTransform: 'uppercase',
    letterSpacing: theme.letterSpacing.s08,
    marginBottom: theme.size.s12,
  },
  animLoader: {
    width: theme.size.s150,
    height: theme.size.s150,
  },
  emptyWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    paddingTop: theme.size.s12,
    paddingBottom: theme.size.s84,
  },
  empty: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.size.s16,
    borderRadius: theme.size.s22,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    overflow: 'hidden',
  },
  emptyText: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.text.primary,
    fontWeight: '700',
    textAlign: 'center',
  },
  anim: {
    width: theme.size.s132,
    height: theme.size.s132,
  },
  scrollToTopBtn: {
    position: 'absolute',
    zIndex: 100,
    bottom: theme.size.s10,
    width: theme.size.s58,
    height: theme.size.s58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.palette.surface_light,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  scrollToTopBtnLeft: {
    left: theme.size.s0,
  },
  scrollToTopBtnRight: {
    right: theme.size.s0,
  },
}))
