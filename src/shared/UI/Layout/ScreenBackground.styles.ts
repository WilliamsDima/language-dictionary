import { COLORS } from '@/assets/styles/colors'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
    width: 260,
    height: 260,
    borderRadius: 260 / 2,
    backgroundColor: 'rgba(124, 255, 107, 0.12)',
  },
  sideGlow: {
    position: 'absolute',
    top: 160,
    left: -100,
    width: 220,
    height: 220,
    borderRadius: 220 / 2,
    backgroundColor: 'rgba(89, 184, 255, 0.16)',
  },
  bottomGlow: {
    position: 'absolute',
    bottom: -120,
    right: -40,
    width: 260,
    height: 260,
    borderRadius: 260 / 2,
    backgroundColor: 'rgba(255, 111, 174, 0.12)',
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.015)',
    opacity: 0.6,
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.bg_modal,
    opacity: 0.18,
  },
})
