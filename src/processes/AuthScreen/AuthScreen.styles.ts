
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  screen: {
    paddingHorizontal: theme.layout.appPadding,
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: theme.size.s24,
    paddingBottom: theme.size.s36,
  },
  content: {
    gap: theme.size.s18,
  },
  heroCard: {
    borderRadius: theme.size.s32,
    padding: theme.size.s20,
    backgroundColor: theme.colors.palette.card_alpha_92,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  heroCopy: {
    maxWidth: '72%',
  },
  badge: {
    color: theme.colors.palette.primery,
    fontSize: theme.fontSize.s12,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-Bold',
    marginBottom: theme.size.s10,
  },
  subtitle: {
    fontSize: theme.fontSize.s14,
    lineHeight: theme.fontSize.s20,
    color: theme.colors.palette.gray_text,
    marginTop: theme.size.s10,
  },
  heroVisual: {
    position: 'absolute',
    right: theme.size.s12,
    bottom: theme.size.s12,
  },
  heroImage: {
    width: theme.size.s112,
    height: theme.size.s112,
    resizeMode: 'contain',
  },
  placeholderCard: {
    minHeight: theme.size.s96,
    borderRadius: theme.size.s24,
    borderWidth: theme.size.s2,
    borderColor: theme.colors.palette.red_placeholder,
    backgroundColor: theme.colors.palette.danger_alpha_16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: theme.colors.palette.red_placeholder,
    fontSize: theme.fontSize.s14,
    fontFamily: 'Mulish-ExtraBold',
  },

  icon: {
    width: theme.size.s20,
    height: theme.size.s20,
    borderRadius: theme.size.s20 / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSelect: {
    width: theme.size.s40,
    height: theme.size.s40,
    borderRadius: theme.size.s40 / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: theme.fontSize.s28,
    lineHeight: theme.fontSize.s34,
    marginTop: theme.size.s2,
    fontFamily: 'Mulish-ExtraBold',
  },

  controlsCard: {
    flexDirection: 'column',
    gap: theme.size.s20,
    width: '100%',
    borderRadius: theme.size.s28,
    padding: theme.size.s18,
    backgroundColor: theme.colors.palette.card_alpha_90,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
  },
  controlsTitle: {
    fontSize: theme.fontSize.s16,
    fontFamily: 'Mulish-Bold',
  },
  lang: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '100%',
    gap: theme.size.s12,
  },
  langIcon: {
    width: theme.size.s62,
    height: theme.size.s62,
    borderRadius: theme.size.s20,
    backgroundColor: theme.colors.palette.surface_light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperSelect: {
    flex: 1,
    minWidth: '70%',
  },
}))