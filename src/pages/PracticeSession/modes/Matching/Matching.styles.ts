import { StyleSheet } from 'react-native-unistyles'

// колонки по центру свободного места: короткий раунд (2–4 пары) не
// растягивает плитки на весь экран
export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: theme.size.s12,
  },
  column: {
    flex: 1,
    gap: theme.size.s10,
  },
}))
