import { COLORS } from '@/assets/styles/colors'
import {
  APP_PADDING,
  scaleFontSize,
  scaleWidth,
} from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: APP_PADDING,
    position: 'relative',
    justifyContent: 'flex-start',
    paddingTop: scaleWidth(12),
    paddingBottom: scaleWidth(24),
  },
  hero: {
    marginBottom: scaleWidth(12),
    borderRadius: scaleWidth(22),
    padding: scaleWidth(14),
    backgroundColor: 'rgba(17, 39, 65, 0.92)',
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroCopy: {
    flex: 1,
    paddingRight: scaleWidth(12),
  },
  heroKicker: {
    fontSize: scaleFontSize(10),
    color: COLORS.primery,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-Bold',
    marginBottom: scaleWidth(8),
  },
  heroTitle: {
    fontSize: scaleFontSize(18),
    fontFamily: 'Mulish-ExtraBold',
  },
  heroPlaceholder: {
    width: scaleWidth(68),
    height: scaleWidth(68),
    borderRadius: scaleWidth(18),
    borderWidth: 2,
    borderColor: COLORS.red_placeholder,
    backgroundColor: 'rgba(255, 59, 48, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPlaceholderText: {
    color: COLORS.red_placeholder,
    fontSize: scaleFontSize(10),
    fontFamily: 'Mulish-ExtraBold',
  },

  logout: {
    marginTop: scaleWidth(14),
    padding: scaleWidth(14),
    backgroundColor: COLORS.red,
    borderColor: 'transparent',
  },

  repeatBtn: {
    marginTop: scaleWidth(14),
    padding: scaleWidth(14),
    backgroundColor: COLORS.primery,
    borderColor: 'transparent',
  },

  repeatText: {
    fontSize: scaleFontSize(13),
    textTransform: 'uppercase',
    fontFamily: 'Mulish-ExtraBold',
    color: COLORS.black,
  },
  dangerText: {
    fontSize: scaleFontSize(13),
    textTransform: 'uppercase',
    fontFamily: 'Mulish-ExtraBold',
    color: COLORS.white,
  },
  deleteText: {
    fontSize: scaleFontSize(13),
    textTransform: 'uppercase',
    fontFamily: 'Mulish-ExtraBold',
    color: COLORS.red,
  },

  delete: {
    marginTop: scaleWidth(14),
    padding: scaleWidth(14),
    borderColor: COLORS.red,
  },
})
