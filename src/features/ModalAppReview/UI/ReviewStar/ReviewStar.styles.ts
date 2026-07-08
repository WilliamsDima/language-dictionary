import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  star: {
    fontSize: theme.fontSize.s34,
    opacity: theme.opacity.o35,
    variants: {
      active: {
        true: {
          opacity: theme.opacity.o100,
        },
      },
    },
  },
}))
