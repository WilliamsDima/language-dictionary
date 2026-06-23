import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    position: 'absolute',
    bottom: theme.size.s102,
    zIndex: 50,
    width: theme.size.s58,
    height: theme.size.s58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperLeft: {
    left: theme.size.s14,
  },
  wrapperRight: {
    right: theme.size.s14,
  },
  halo: {
    position: 'absolute',
    width: theme.size.s58,
    height: theme.size.s58,
    borderRadius: theme.size.s58 / 2,
    backgroundColor: theme.colors.palette.success_alpha_22,
  },
  haloLeft: {
    left: theme.size.s0,
  },
  haloRight: {
    right: theme.size.s0,
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
