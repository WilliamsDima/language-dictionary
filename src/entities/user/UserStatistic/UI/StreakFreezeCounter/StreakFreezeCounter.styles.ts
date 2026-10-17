import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  chip: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.size.s4,
    paddingVertical: theme.size.s3,
    paddingHorizontal: theme.size.s8,
    borderRadius: theme.radius.pill,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.white_alpha_06,
    backgroundColor: theme.colors.palette.ink_alpha_08,
  },
  icon: {
    fontSize: theme.fontSize.s12,
  },
  text: {
    fontSize: theme.fontSize.s12,
    fontFamily: theme.fonts.extraBold,
    color: theme.colors.palette.black,
  },
}))
