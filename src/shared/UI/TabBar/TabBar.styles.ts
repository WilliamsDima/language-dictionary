
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  containerStyle: {
    backgroundColor: theme.colors.palette.transparent,
  },
  tab: {
    position: 'relative',
    zIndex: 10,
    justifyContent: 'space-between',
    paddingHorizontal: theme.size.s14,
    paddingTop: theme.size.s10,
    paddingBottom: theme.size.s28,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.palette.tab_bar_alpha_94,
    borderTopLeftRadius: theme.size.s22,
    borderTopRightRadius: theme.size.s22,
    overflow: 'hidden',
    width: '100%',
    borderTopWidth: theme.size.s1,
    borderLeftWidth: theme.size.s1,
    borderRightWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  hidden: {
    display: 'none',
  },
}))