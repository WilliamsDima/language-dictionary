import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  item: {
    width: '100%',
    backgroundColor: 'rgba(16, 34, 56, 0.92)',
    padding: scaleWidth(14),
    borderRadius: scaleWidth(24),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemDeleteActive: {
    backgroundColor: COLORS.red_opacity_1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleWidth(12),
    alignItems: 'center',
  },
  status: {
    width: scaleWidth(12),
    height: scaleWidth(12),
    borderRadius: scaleWidth(12 / 2),
  },

  flagWrapper: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flag: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    borderRadius: scaleWidth(20 / 2),
    resizeMode: 'cover',
  },

  date: {
    fontSize: scaleFontSize(12),
    color: COLORS.gray_text,
    fontFamily: 'Mulish-Bold',
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },

  btnTranslate: {
    padding: scaleWidth(5),
  },

  descriptionBlock: {
    marginTop: scaleWidth(10),
    borderTopWidth: scaleWidth(1),
    borderTopColor: COLORS.border,
    paddingTop: scaleWidth(10),
  },
  description: {
    fontSize: scaleFontSize(14),
    color: COLORS.gray_text,
  },

  showFooterBtn: {
    width: '100%',
    paddingVertical: scaleWidth(10),
    marginTop: scaleWidth(10),
    alignItems: 'center',
    backgroundColor: COLORS.bg_modal_light,
    borderRadius: scaleWidth(14),
  },
  statusText: {
    fontSize: scaleFontSize(14),
    textTransform: 'uppercase',
    fontFamily: 'Mulish-Bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: scaleWidth(12),
    paddingHorizontal: scaleWidth(6),
  },
})
