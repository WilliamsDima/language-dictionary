import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    marginTop: scaleWidth(30),
    padding: scaleWidth(18),
    borderRadius: scaleWidth(24),
    backgroundColor: 'rgba(17, 39, 65, 0.9)',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  title: {
    fontSize: scaleFontSize(16),
    color: COLORS.white,
    fontWeight: '700',
    fontFamily: 'Mulish-Bold',
  },
  subtitle: {
    fontSize: scaleFontSize(16),
    color: COLORS.white,
    marginTop: scaleWidth(20),
    marginBottom: scaleWidth(10),
    fontFamily: 'Mulish-Bold',
  },

  developer: {
    marginTop: scaleWidth(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleWidth(8),
  },
  developerText: {
    fontSize: scaleFontSize(14),
    color: COLORS.primery,
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
    paddingVertical: scaleWidth(6),
  },
  socialIcon: {
    width: scaleWidth(30),
    height: scaleWidth(30),
    resizeMode: 'cover',
    marginRight: scaleWidth(5),
  },
  socialText: {
    fontSize: scaleFontSize(15),
    color: COLORS.gray_text,
  },
})
