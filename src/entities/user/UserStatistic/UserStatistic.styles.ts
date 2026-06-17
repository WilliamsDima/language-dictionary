import { height, width } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    marginTop: theme.size.s20,
    padding: theme.size.s14,
    borderRadius: theme.size.s20,
    backgroundColor: theme.colors.palette.card_alpha_90,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },

  statistic: {
    fontSize: theme.fontSize.s13,
    color: theme.colors.palette.primery,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-Bold',
    marginBottom: theme.size.s8,
  },

  item: {
    marginVertical: theme.size.s4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.size.s6,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.palette.white_alpha_05,
  },
  itemText: {
    fontSize: theme.fontSize.s13,
    color: theme.colors.palette.white,
  },

  loader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    zIndex: 10,
  },
  animLoader: {
    width: theme.size.s150,
    height: theme.size.s150,
  },
}))