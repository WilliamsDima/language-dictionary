import { COLORS } from '@/assets/styles/colors'
import { scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  item: {
    width: '100%',
    backgroundColor: COLORS.item,
    padding: scaleWidth(10),
    borderRadius: scaleWidth(5),
  },

  showFooterBtn: {
    width: '100%',
    paddingVertical: scaleWidth(7),
    marginTop: scaleWidth(10),
    alignItems: 'center',
    backgroundColor: COLORS.bg_modal_light,
    borderRadius: scaleWidth(2),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: scaleWidth(10),
  },
})
