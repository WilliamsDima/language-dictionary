
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  backdrop: {
    backgroundColor: theme.colors.palette.black,
  },
  handleIndicator: {
    width: theme.size.s44,
    height: theme.size.s5,
    borderRadius: theme.size.s999,
    backgroundColor: theme.colors.palette.border,
  },
  background: {
    backgroundColor: theme.colors.palette.tab_bar_dark,
    borderTopLeftRadius: theme.size.s28,
    borderTopRightRadius: theme.size.s28,
    borderTopWidth: theme.size.s1,
    borderLeftWidth: theme.size.s1,
    borderRightWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  container: {},
  content: {
    paddingHorizontal: theme.size.s18,
    paddingTop: theme.size.s10,
    paddingBottom: theme.size.s24,
  },
  scrollContent: {
    paddingHorizontal: theme.size.s18,
    paddingTop: theme.size.s10,
    paddingBottom: theme.size.s24,
  },
  header: {
    paddingHorizontal: theme.size.s18,
    paddingBottom: theme.size.s12,
    paddingTop: theme.size.s6,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.size.s12,
  },
  headerTextBlock: {
    flex: 1,
    minWidth: theme.size.s0,
  },
  title: {
    color: theme.colors.palette.white,
    fontSize: theme.fontSize.s18,
    fontFamily: 'Mulish-ExtraBold',
    paddingTop: theme.size.s4,
    lineHeight: theme.lineHeights.lg,
  },
  subtitle: {
    color: theme.colors.palette.gray_text,
    fontSize: theme.fontSize.s12,
    marginTop: theme.size.s4,
    lineHeight: theme.lineHeights.xs,
  },
  closeButton: {
    width: theme.size.s36,
    height: theme.size.s36,
    borderRadius: theme.size.s18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.palette.white_alpha_04,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
}))
