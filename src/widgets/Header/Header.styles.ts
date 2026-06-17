import { width } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native-unistyles'

export const HEADER_HEIGHT = 50

export const styles = StyleSheet.create((theme) => ({
  header: {
    paddingHorizontal: theme.layout.appPadding,
    paddingVertical: theme.size.s10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    // top: IS_IOS ? HEADER_HEIGHT : 0,
    paddingTop: theme.size.s10,
    // height: HEADER_HEIGHT,
    backgroundColor: theme.colors.palette.white,
    zIndex: 100,
    width: width,
  },
  title: {
    color: theme.colors.palette.black,
    fontFamily: 'Mulish',
    fontWeight: '700',
    marginRight: theme.size.s20,
    variants: {
      titleSize: {
        main: {
          fontWeight: '600',
          fontSize: theme.fontSize.s24,
        },
        secondary: {
          fontWeight: '700',
          fontSize: theme.fontSize.s18,
        },
      },
    },
  },

  backBtn: {
    marginRight: theme.size.s20,
  },
}))
