import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    marginTop: scaleWidth(30),
  },

  title: {
    fontSize: scaleFontSize(16),
    color: COLORS.white,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: scaleFontSize(16),
    color: COLORS.white,
    marginTop: scaleWidth(20),
    marginBottom: scaleWidth(10),
  },

  developer: {
    marginTop: scaleWidth(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  developerText: {
    fontSize: scaleFontSize(14),
    color: COLORS.green,
    marginLeft: scaleWidth(5),
  },
  googleplay: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    resizeMode: 'cover',
  },

  social: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scaleWidth(5),
  },
  socialIcon: {
    width: scaleWidth(30),
    height: scaleWidth(30),
    resizeMode: 'cover',
    marginRight: scaleWidth(5),
  },
  socialText: {
    fontSize: scaleFontSize(15),
    color: COLORS.white,
  },
})
