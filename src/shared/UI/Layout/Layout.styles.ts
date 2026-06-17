import { HEADER_HEIGHT } from '@/widgets/Header/Header.styles'
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  safeArea: {
    flex: 1,
    paddingTop: HEADER_HEIGHT - 30,
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
        scroll: {
          paddingTop: HEADER_HEIGHT,
        },
      },
    },
  },
  content: {
    flex: 1,
  },
}))
