import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    position: 'relative',
  },
  containerStyle: {
    backgroundColor: theme.colors.palette.transparent,
  },
  practiceContainer: {
    position: 'relative',
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
    overflow: 'hidden',
    width: '100%',
  },
  hidden: {
    display: 'none',
  },
}))
