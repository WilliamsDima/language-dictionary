import { COLORS } from '@/assets/styles/colors'
import { scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.bg_modal,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    width: '90%',
    backgroundColor: COLORS.tab_bar_dark,
    borderRadius: scaleWidth(10),
    padding: scaleWidth(10),
  },

  options: {
    flexDirection: 'column',
    gap: scaleWidth(20),
  },

  top: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  bottom: {
    marginTop: scaleWidth(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scaleWidth(30),
  },

  btn: {
    backgroundColor: COLORS.primery,
    padding: scaleWidth(10),
    borderRadius: scaleWidth(5),
    flex: 1,
  },
  btnCancel: {
    backgroundColor: COLORS.red,
  },
})
