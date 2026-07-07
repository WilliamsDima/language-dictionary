import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: theme.size.s49,
    height: theme.size.s49,
    borderTopRightRadius: theme.size.s52,
    overflow: 'hidden',
    zIndex: 20,
    backgroundColor: theme.colors.tabBar.background,
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: theme.spacing.md,
    paddingTop: theme.spacing.xs,
  },
  emoji: {
    width: theme.size.s24,
    height: theme.size.s28,
  },
}))
