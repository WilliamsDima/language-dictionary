import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titles: {
    position: 'absolute',
    top: theme.size.s100,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.size.s10,
    paddingHorizontal: theme.size.s20,
  },
  title: {
    color: theme.colors.text.primary,
    textTransform: 'uppercase',
    fontWeight: '800',
    fontSize: theme.fontSize.s30,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  description: {
    color: theme.colors.text.primary,
    fontWeight: '600',
    fontSize: theme.fontSize.s16,
    textAlign: 'center',
    opacity: theme.opacity.o60,
  },
  footer: {
    position: 'absolute',
    bottom: theme.size.s30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  lottie: {
    width: theme.size.s300,
    height: theme.size.s300,
  },
}))
