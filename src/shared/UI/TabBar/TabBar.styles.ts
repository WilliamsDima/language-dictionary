import { COLORS } from '@/assets/styles/colors'
import { scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: COLORS.white,
  },
  tab: {
    position: 'relative',
    zIndex: 10,
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(30),
    paddingVertical: scaleWidth(20),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
    overflow: 'hidden',
    width: '100%',
  },
  hidden: {
    display: 'none',
  },
})
