
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  screen: {
    paddingHorizontal: theme.layout.appPadding,
    position: 'relative',
    justifyContent: 'flex-start',
    paddingBottom: theme.size.s24,
  },
  privacyPolicy: {
    padding: theme.size.s14,
    marginVertical: theme.size.s14,
    borderColor: theme.colors.palette.border,
  },
  privacyPolicyText: {
    color: theme.colors.palette.white,
    fontSize: theme.fontSize.s14,
    fontFamily: 'Mulish-Bold',
  },
}))
