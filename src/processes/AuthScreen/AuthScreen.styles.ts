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
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: scaleWidth(24),
    paddingBottom: scaleWidth(36),
  },
  content: {
    gap: scaleWidth(18),
  },
  heroCard: {
    borderRadius: scaleWidth(32),
    padding: scaleWidth(20),
    backgroundColor: 'rgba(17, 39, 65, 0.92)',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  heroCopy: {
    maxWidth: '72%',
  },
  badge: {
    color: COLORS.primery,
    fontSize: scaleFontSize(12),
    textTransform: 'uppercase',
    fontFamily: 'Mulish-Bold',
    marginBottom: scaleWidth(10),
  },
  subtitle: {
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(20),
    color: COLORS.gray_text,
    marginTop: scaleWidth(10),
  },
  heroVisual: {
    position: 'absolute',
    right: scaleWidth(12),
    bottom: scaleWidth(12),
  },
  heroImage: {
    width: scaleWidth(112),
    height: scaleWidth(112),
    resizeMode: 'contain',
  },
  placeholderCard: {
    minHeight: scaleWidth(96),
    borderRadius: scaleWidth(24),
    borderWidth: 2,
    borderColor: COLORS.red_placeholder,
    backgroundColor: 'rgba(255, 59, 48, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: COLORS.red_placeholder,
    fontSize: scaleFontSize(14),
    fontFamily: 'Mulish-ExtraBold',
  },

  icon: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSelect: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: scaleFontSize(28),
    lineHeight: scaleFontSize(34),
    marginTop: scaleWidth(2),
    fontFamily: 'Mulish-ExtraBold',
  },

  controlsCard: {
    flexDirection: 'column',
    gap: scaleWidth(20),
    width: '100%',
    borderRadius: scaleWidth(28),
    padding: scaleWidth(18),
    backgroundColor: 'rgba(17, 39, 65, 0.9)',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  controlsTitle: {
    fontSize: scaleFontSize(16),
    fontFamily: 'Mulish-Bold',
  },
  lang: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '100%',
    gap: scaleWidth(12),
  },
  langIcon: {
    width: scaleWidth(62),
    height: scaleWidth(62),
    borderRadius: scaleWidth(20),
    backgroundColor: COLORS.surface_light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperSelect: {
    flex: 1,
    minWidth: '70%',
  },
})
