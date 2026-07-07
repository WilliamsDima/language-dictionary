import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titles: {
    position: 'absolute',
    top: theme.size.s80,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.size.s10,
    paddingHorizontal: theme.size.s20,
  },
  title: {
    color: theme.colors.text.primary,
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: theme.fontSize.s28,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  description: {
    color: theme.colors.text.primary,
    fontWeight: '600',
    fontSize: theme.fontSize.s14,
    textAlign: 'center',
    opacity: theme.opacity.o60,
  },
  chart: {
    position: 'absolute',
    bottom: theme.size.s250,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '90%',
    height: theme.size.s120,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barTrack: {
    width: theme.size.s10,
    height: theme.size.s100,
    justifyContent: 'flex-end',
    backgroundColor: theme.colors.palette.dark_alpha_10,
    borderRadius: theme.radius.xs,
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    backgroundColor: theme.colors.palette.gold,
    borderRadius: theme.radius.xs,
  },
  barLabel: {
    marginTop: theme.size.s4,
    color: theme.colors.text.primary,
    fontSize: theme.fontSize.s10,
    opacity: theme.opacity.o60,
    textTransform: 'lowercase',
  },
  footer: {
    position: 'absolute',
    bottom: theme.size.s20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  lottie: {
    width: theme.size.s170,
    height: theme.size.s170,
  },
}))
