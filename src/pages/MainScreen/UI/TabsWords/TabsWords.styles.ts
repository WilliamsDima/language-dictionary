import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scaleWidth(20),
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(5),
    paddingVertical: scaleWidth(5),
    borderRadius: scaleWidth(5),
  },
  btnActive: {
    backgroundColor: COLORS.green,
  },
  circle: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    borderRadius: scaleWidth(20 / 2),
  },
  label: {
    fontSize: scaleFontSize(13),
    textTransform: 'uppercase',
    marginLeft: scaleWidth(5),
    fontWeight: '700',
  },
})
