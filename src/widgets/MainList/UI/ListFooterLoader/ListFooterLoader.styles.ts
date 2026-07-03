import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  // оверлей поверх списка, а не часть скроллируемого контента — виден,
  // пока идёт подгрузка, независимо от текущей позиции прокрутки
  wrapper: {
    position: 'absolute',
    left: theme.size.s0,
    right: theme.size.s0,
    bottom: theme.size.s20,
    alignItems: 'center',
    zIndex: 90,
  },
}))
