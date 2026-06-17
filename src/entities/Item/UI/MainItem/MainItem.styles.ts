
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  item: {
    width: '100%',
    backgroundColor: theme.colors.palette.item_alpha_92,
    padding: theme.size.s14,
    borderRadius: theme.size.s24,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    variants: {
      isDeleteActive: {
        true: {
          backgroundColor: theme.colors.palette.red_opacity_1,
        },
      },
    },
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.size.s12,
    alignItems: 'center',
  },
  status: {
    width: theme.size.s12,
    height: theme.size.s12,
    borderRadius: theme.size.s12 / 2,
    variants: {
      statusTone: {
        study: {
          backgroundColor: theme.colors.palette.item_study,
        },
        ready: {
          backgroundColor: theme.colors.palette.item_ready,
        },
      },
    },
  },

  flagWrapper: {
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flag: {
    width: theme.size.s20,
    height: theme.size.s20,
    borderRadius: theme.size.s20 / 2,
    resizeMode: 'cover',
  },

  date: {
    fontSize: theme.fontSize.s12,
    color: theme.colors.palette.gray_text,
    fontFamily: 'Mulish-Bold',
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },

  btnTranslate: {
    padding: theme.size.s5,
  },

  descriptionBlock: {
    marginTop: theme.size.s10,
    borderTopWidth: theme.size.s1,
    borderTopColor: theme.colors.palette.border,
    paddingTop: theme.size.s10,
  },
  description: {
    fontSize: theme.fontSize.s14,
    color: theme.colors.palette.gray_text,
  },

  showFooterBtn: {
    width: '100%',
    paddingVertical: theme.size.s10,
    marginTop: theme.size.s10,
    alignItems: 'center',
    backgroundColor: theme.colors.palette.bg_modal_light,
    borderRadius: theme.size.s14,
  },
  statusText: {
    fontSize: theme.fontSize.s14,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-Bold',
    variants: {
      statusTone: {
        study: {
          color: theme.colors.palette.item_study,
        },
        ready: {
          color: theme.colors.palette.item_ready,
        },
      },
    },
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: theme.size.s12,
    paddingHorizontal: theme.size.s6,
  },
}))