import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  screen: {
    paddingHorizontal: theme.layout.appPadding,
    position: 'relative',
    justifyContent: 'flex-start',
    paddingBottom: theme.size.s24,
  },
}))
