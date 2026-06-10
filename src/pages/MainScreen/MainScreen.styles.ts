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
    paddingBottom: scaleWidth(12),
    flex: 1,
  },
  topSection: {
    width: '100%',
    flexShrink: 0,
  },
  hero: {
    width: '100%',
    minHeight: scaleWidth(132),
    borderRadius: scaleWidth(22),
    padding: scaleWidth(14),
    backgroundColor: 'rgba(17, 39, 65, 0.92)',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: scaleWidth(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(10),
  },
  heroTextBlock: {
    flex: 1,
  },
  kicker: {
    color: COLORS.primery,
    fontSize: scaleFontSize(10),
    textTransform: 'uppercase',
    fontFamily: 'Mulish-Bold',
    marginBottom: scaleWidth(8),
  },
  title: {
    fontSize: scaleFontSize(20),
    lineHeight: scaleFontSize(24),
    fontFamily: 'Mulish-ExtraBold',
    marginBottom: scaleWidth(6),
  },
  subtitle: {
    fontSize: scaleFontSize(12),
    lineHeight: scaleFontSize(17),
    color: COLORS.gray_text,
  },
  heroPlaceholder: {
    width: scaleWidth(78),
    height: scaleWidth(92),
    borderRadius: scaleWidth(20),
    backgroundColor: 'rgba(255, 59, 48, 0.18)',
    borderWidth: 2,
    borderColor: COLORS.red_placeholder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPlaceholderText: {
    color: COLORS.red_placeholder,
    fontFamily: 'Mulish-ExtraBold',
    fontSize: scaleFontSize(11),
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleWidth(8),
  },
  tabsWrapper: {
    width: '100%',
    marginBottom: scaleWidth(10),
  },
  listSection: {
    flex: 1,
    minHeight: 0,
    width: '100%',
  },
})
