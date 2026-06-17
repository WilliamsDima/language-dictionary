
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    marginTop: theme.size.s30,
    padding: theme.size.s18,
    borderRadius: theme.size.s24,
    backgroundColor: theme.colors.palette.card_alpha_90,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },

  title: {
    fontSize: theme.fontSize.s16,
    color: theme.colors.palette.white,
    fontWeight: '700',
    fontFamily: 'Mulish-Bold',
  },
  subtitle: {
    fontSize: theme.fontSize.s16,
    color: theme.colors.palette.white,
    marginTop: theme.size.s20,
    marginBottom: theme.size.s10,
    fontFamily: 'Mulish-Bold',
  },

  developer: {
    marginTop: theme.size.s10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.size.s8,
  },
  developerText: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.palette.primery,
    marginLeft: theme.size.s5,
  },
  googleplay: {
    width: theme.size.s20,
    height: theme.size.s20,
    resizeMode: 'cover',
  },

  social: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.size.s5,
    paddingVertical: theme.size.s6,
  },
  socialIcon: {
    width: theme.size.s30,
    height: theme.size.s30,
    resizeMode: 'cover',
    marginRight: theme.size.s5,
  },
  socialText: {
    fontSize: theme.fontSize.s15,
    color: theme.colors.palette.gray_text,
  },
}))