
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  screen: {
    paddingHorizontal: theme.layout.appPadding,
    position: 'relative',
    justifyContent: 'flex-start',
    paddingTop: theme.size.s12,
    paddingBottom: theme.size.s12,
    flex: 1,
  },
  topSection: {
    width: '100%',
    flexShrink: 0,
  },
  hero: {
    width: '100%',
    minHeight: theme.size.s132,
    borderRadius: theme.size.s22,
    padding: theme.size.s14,
    backgroundColor: theme.colors.palette.card_alpha_92,
    borderWidth: theme.size.s1,
    borderColor: theme.colors.palette.border,
    marginBottom: theme.size.s12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.size.s10,
  },
  heroTextBlock: {
    flex: 1,
  },
  kicker: {
    color: theme.colors.palette.primery,
    fontSize: theme.fontSize.s10,
    textTransform: 'uppercase',
    fontFamily: 'Mulish-Bold',
    marginBottom: theme.size.s8,
  },
  title: {
    fontSize: theme.fontSize.s20,
    lineHeight: theme.fontSize.s24,
    fontFamily: 'Mulish-ExtraBold',
    marginBottom: theme.size.s6,
  },
  subtitle: {
    fontSize: theme.fontSize.s12,
    lineHeight: theme.fontSize.s17,
    color: theme.colors.palette.gray_text,
  },
  heroPlaceholder: {
    width: theme.size.s78,
    height: theme.size.s92,
    borderRadius: theme.size.s20,
    backgroundColor: theme.colors.palette.danger_alpha_18,
    borderWidth: theme.size.s2,
    borderColor: theme.colors.palette.red_placeholder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPlaceholderText: {
    color: theme.colors.palette.red_placeholder,
    fontFamily: 'Mulish-ExtraBold',
    fontSize: theme.fontSize.s11,
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.size.s8,
  },
  tabsWrapper: {
    width: '100%',
    marginBottom: theme.size.s10,
  },
  listSection: {
    flex: 1,
    minHeight: theme.size.s0,
    width: '100%',
  },
}))