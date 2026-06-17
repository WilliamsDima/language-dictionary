import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  screen: {
    paddingHorizontal: theme.layout.appPadding,
    position: 'relative',
    justifyContent: 'flex-start',
    paddingTop: theme.size.s12,
    flex: 1,
  },
  topSection: {
    width: '100%',
    flexShrink: 0,
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.size.s8,
  },
  tabsWrapper: {
    width: '100%',
    marginBottom: theme.size.s10,
  },
  listSection: {
    flex: 1,
    minHeight: theme.size.s0,
    width: '100%',
  },
  slide: {
    flex: 1,
    minHeight: theme.size.s0,
  },
}))
