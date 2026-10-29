import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    width: '100%',
    gap: theme.size.s14,
    paddingHorizontal: theme.layout.appPadding,
    paddingTop: theme.size.s8,
    paddingBottom: rt.insets.bottom + theme.size.s12,
  },
  loader: {
    flex: 1,
  },
}))
