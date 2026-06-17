
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    position: 'absolute',
    bottom: theme.size.s102,
    right: theme.size.s14,
    zIndex: 50,
    width: theme.size.s58,
    height: theme.size.s58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
    width: theme.size.s58,
    height: theme.size.s58,
    borderRadius: theme.size.s58 / 2,
    backgroundColor: theme.colors.palette.success_alpha_22,
  },
  btn: {
    width: theme.size.s58,
    height: theme.size.s58,
    borderRadius: theme.size.s58 / 2,
    backgroundColor: theme.colors.palette.primery,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.palette.primery,
    shadowOpacity: theme.opacity.o35,
    shadowRadius: theme.size.s14,
    shadowOffset: {
      width: theme.size.s0,
      height: theme.size.s12,
    },
    elevation: theme.size.s16,
  },
}))