import { COLORS } from '@/assets/styles/colors'
import { scaleFontSize, scaleWidth } from '@/shared/helpers/ScaleUtils'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  item: {
    width: '100%',
    backgroundColor: COLORS.item,
    padding: scaleWidth(10),
    borderRadius: scaleWidth(5),
  },
  itemDeleteActive: {
    backgroundColor: COLORS.red_opacity_1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleWidth(5),
    alignItems: 'center',
  },
  status: {
    width: scaleWidth(15),
    height: scaleWidth(15),
    borderRadius: scaleWidth(15 / 2),
  },

  flagWrapper: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flag: {
    width: scaleWidth(15),
    height: scaleWidth(15),
    borderRadius: scaleWidth(15 / 2),
    resizeMode: 'cover',
  },

  date: {
    fontSize: scaleFontSize(12),
    color: COLORS.gray_text,
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
    borderTopColor: COLORS.white,
    paddingTop: scaleWidth(5),
  },
  description: {
    fontSize: scaleFontSize(16),
  },

  showFooterBtn: {
    width: '100%',
    paddingVertical: scaleWidth(7),
    marginTop: scaleWidth(10),
    alignItems: 'center',
    backgroundColor: COLORS.bg_modal_light,
    borderRadius: scaleWidth(2),
  },
  statusText: {
    fontSize: scaleFontSize(14),
    textTransform: 'uppercase',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: scaleWidth(10),
  },
})
