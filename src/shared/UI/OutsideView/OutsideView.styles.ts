import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((_theme) => ({
  wrapper: {
    display: 'none',
    position: 'absolute',
    zIndex: 100,
    variants: {
      visible: {
        true: {
          display: 'flex',
        },
      },
    },
  },
  conteiner: {},
}))