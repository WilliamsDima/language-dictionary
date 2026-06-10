import { COLORS } from '@/assets/styles/colors'
import { scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    color: COLORS.white,
    fontSize: scaleWidth(24),
    fontFamily: 'Mulish-ExtraBold',
    marginBottom: scaleWidth(8),
  },
  subtitle: {
    color: COLORS.gray_text,
    fontSize: scaleWidth(14),
    textAlign: 'center',
    marginBottom: scaleWidth(12),
    maxWidth: '74%',
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
