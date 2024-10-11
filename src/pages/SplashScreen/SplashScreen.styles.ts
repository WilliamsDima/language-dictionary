import { COLORS } from '@/assets/styles/colors'
import { scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray_text,
  },

  words: {
    width: '50%',
    height: scaleWidth(200),
  },
  planet: {
    width: '80%',
    height: scaleWidth(300),
    marginTop: -50,
  },
})
