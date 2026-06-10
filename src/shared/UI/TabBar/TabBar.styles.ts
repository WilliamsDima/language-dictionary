import { COLORS } from '@/assets/styles/colors'
import { scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
  },
  tab: {
    position: 'relative',
    zIndex: 10,
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(14),
    paddingTop: scaleWidth(10),
    paddingBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 26, 43, 0.94)',
    borderTopLeftRadius: scaleWidth(22),
    borderTopRightRadius: scaleWidth(22),
    overflow: 'hidden',
    width: '100%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.border,
  },
  hidden: {
    display: 'none',
  },
})
