import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  topGlow: {
    position: 'absolute',
    top: -120,
    right: -40,
    width: theme.size.s260,
    height: theme.size.s260,
    borderRadius: theme.size.s260 / 2,
    backgroundColor: theme.colors.palette.success_alpha_12,
  },
  sideGlow: {
    position: 'absolute',
    top: theme.size.s160,
    left: -100,
    width: theme.size.s220,
    height: theme.size.s220,
    borderRadius: theme.size.s220 / 2,
    backgroundColor: theme.colors.palette.info_alpha_16,
  },
  bottomGlow: {
    position: 'absolute',
    bottom: -120,
    right: -40,
    width: theme.size.s260,
    height: theme.size.s260,
    borderRadius: theme.size.s260 / 2,
    backgroundColor: theme.colors.palette.pink_alpha_12,
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.white_alpha_015,
    opacity: theme.opacity.o60,
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.palette.bg_modal,
    opacity: theme.opacity.o18,
  },
}))