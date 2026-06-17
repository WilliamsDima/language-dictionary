
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  input: {
    width: '100%',
    height: theme.size.s50,
  },
  wrapper: {
    height: theme.size.s50,
    flex: 1,
    marginRight: theme.size.s10,
  },
}))