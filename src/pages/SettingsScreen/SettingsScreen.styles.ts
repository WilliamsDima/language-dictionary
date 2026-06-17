
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  screen: {
    paddingHorizontal: theme.layout.appPadding,
    position: 'relative',
    justifyContent: 'flex-start',
    paddingTop: theme.size.s12,
    paddingBottom: theme.size.s24,
  },
  hero: {
    marginBottom: theme.size.s12,
    borderRadius: theme.size.s22,
    padding: theme.size.s14,
    backgroundColor: theme.colors.palette.card_alpha_92,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroCopy: {
    flex: 1,
    paddingRight: theme.size.s12,
  },
  heroKicker: {
    fontSize: theme.fontSize.s10,
    color: theme.colors.palette.blue,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-Bold',
    marginBottom: theme.size.s8,
  },
  heroTitle: {
    fontSize: theme.fontSize.s18,
    fontFamily: 'Mulish-ExtraBold',
  },
  heroPlaceholder: {
    width: theme.size.s68,
    height: theme.size.s68,
    borderRadius: theme.size.s18,
    borderWidth: theme.size.s2,
    borderColor: theme.colors.palette.red_placeholder,
    backgroundColor: theme.colors.palette.danger_alpha_16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPlaceholderText: {
    color: theme.colors.palette.red_placeholder,
    fontSize: theme.fontSize.s10,
    fontFamily: 'Mulish-ExtraBold',
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