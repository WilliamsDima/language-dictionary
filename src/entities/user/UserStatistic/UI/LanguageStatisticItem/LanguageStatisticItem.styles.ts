import { COLORS } from '@/assets/styles/colors'
import { scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  itemLang: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: scaleWidth(15),
    height: scaleWidth(15),
    resizeMode: 'cover',
    marginRight: scaleWidth(3),
  },
  languagesText: {
    color: COLORS.primery,
  },
})
