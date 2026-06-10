import { COLORS } from '@/assets/styles/colors'
import { scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    marginBottom: scaleWidth(20),
    padding: scaleWidth(18),
    borderRadius: scaleWidth(24),
    backgroundColor: 'rgba(17, 39, 65, 0.9)',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
})
