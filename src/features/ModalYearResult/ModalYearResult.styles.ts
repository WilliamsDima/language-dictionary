import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  modal: {},

  content: {
    backgroundColor: theme.colors.background.screen,
    flex: 1,
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
