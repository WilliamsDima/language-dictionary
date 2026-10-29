import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.size.s20,
  },
  btn: {
    minWidth: theme.size.s56,
    minHeight: theme.size.s56,
    padding: theme.size.s10,
    borderRadius: theme.size.s20,
  },
}))
