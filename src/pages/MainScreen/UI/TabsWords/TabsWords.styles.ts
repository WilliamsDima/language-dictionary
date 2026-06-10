import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scaleWidth(4),
    marginBottom: scaleWidth(4),
    gap: scaleWidth(6),
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
    paddingHorizontal: scaleWidth(8),
    paddingVertical: scaleWidth(10),
    borderRadius: scaleWidth(16),
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  btnActive: {
    backgroundColor: 'rgba(124, 255, 107, 0.14)',
    borderColor: 'rgba(124, 255, 107, 0.38)',
  },
  circle: {
    width: scaleWidth(12),
    height: scaleWidth(12),
    borderRadius: scaleWidth(12 / 2),
  },
  label: {
    fontSize: scaleFontSize(11),
    textTransform: 'uppercase',
    marginLeft: scaleWidth(6),
    fontWeight: '700',
    color: COLORS.white,
    flexShrink: 1,
  },
})
