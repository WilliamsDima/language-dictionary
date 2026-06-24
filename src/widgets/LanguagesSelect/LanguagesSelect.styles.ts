import { width } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.size.s14,
    paddingVertical: theme.size.s12,
    borderRadius: theme.size.s16,
    backgroundColor: theme.colors.background.surface,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  title: {
    color: theme.colors.text.primary,
    fontSize: theme.fontSize.s14,
  },
  error: {
    color: theme.colors.palette.red,
    fontSize: theme.fontSize.s12,
    marginTop: theme.size.s6,
  },

  flag: {
    width: theme.size.s25,
    height: theme.size.s25,
    resizeMode: 'cover',
  },
}))
