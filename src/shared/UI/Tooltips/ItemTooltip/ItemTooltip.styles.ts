
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tooltip: {
    backgroundColor: theme.colors.palette.white,
    paddingHorizontal: theme.size.s20,
    paddingVertical: theme.size.s10,
    borderRadius: theme.size.s30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.size.s5,
  },
  text: {
    fontSize: theme.fontSize.s10,
    color: theme.colors.palette.black,
  },
}))