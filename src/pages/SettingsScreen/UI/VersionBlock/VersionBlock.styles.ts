import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleWidth(20),
    padding: scaleWidth(18),
    borderRadius: scaleWidth(24),
    backgroundColor: 'rgba(17, 39, 65, 0.9)',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  version: {
    fontSize: scaleFontSize(15),
    color: COLORS.gray_text,
    textAlign: 'center',
  },

  versionInvalid: {
    fontSize: scaleFontSize(14),
    color: COLORS.red,
    textAlign: 'center',
  },

  versionUpdate: {
    fontSize: scaleFontSize(16),
    color: COLORS.primery,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: scaleWidth(5),
  },
})
