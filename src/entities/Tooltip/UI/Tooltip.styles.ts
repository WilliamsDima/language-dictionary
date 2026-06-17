import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    position: 'absolute',
    zIndex: 1000,
    bottom: theme.size.s100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))