import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  safeArea: {
    flex: 1,
    variants: {
      hiddenTabBar: {
        true: {},
      },
      paddingScreen: {
        true: {
          paddingHorizontal: theme.layout.appPadding,
        },
      },
      headerSpacing: {
        none: {},
        top: {
          paddingTop: theme.size.s20,
        },
        scroll: {},
      },
    },
  },
  content: {
    flex: 1,
  },
}))
