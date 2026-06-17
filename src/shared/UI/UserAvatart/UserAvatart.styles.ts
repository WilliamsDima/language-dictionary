
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    width: theme.size.s82,
    height: theme.size.s82,
    borderRadius: theme.size.s82 / 2,
    backgroundColor: theme.colors.palette.surface_light,
    borderWidth: theme.size.s3,
    borderColor: theme.colors.palette.success_alpha_34,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: theme.size.s76,
    height: theme.size.s76,
    borderRadius: theme.size.s76 / 2,
    resizeMode: 'cover',
  },

  name: {
    fontSize: theme.fontSize.s24,
    textTransform: 'uppercase',
    fontWeight: '600',
    color: theme.colors.palette.white,
  },
}))