import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.size.s4,
    marginBottom: theme.size.s4,
    gap: theme.size.s6,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: theme.size.s0,
    minHeight: theme.size.s40,
    paddingHorizontal: theme.size.s8,
    paddingVertical: theme.size.s10,
    borderRadius: theme.size.s16,
    backgroundColor: theme.colors.palette.white_alpha_04,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.white_alpha_06,
    variants: {
      active: {
        true: {
          backgroundColor: theme.colors.palette.success_alpha_14,
          borderColor: theme.colors.palette.success_alpha_38,
        },
      },
    },
  },
  circle: {
    width: theme.size.s12,
    height: theme.size.s12,
    borderRadius: theme.size.s12 / 2,
  },
  label: {
    fontSize: theme.fontSize.s11,
    textTransform: 'uppercase',
    marginLeft: theme.size.s6,
    fontWeight: '700',
    color: theme.colors.palette.white,
    flexShrink: 1,
  },
}))
