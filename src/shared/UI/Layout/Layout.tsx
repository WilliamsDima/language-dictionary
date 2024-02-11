import React, { useMemo, FC, ReactNode, memo } from 'react'
import {
  ColorValue,
  ScrollView,
  StatusBarProps,
  StatusBarStyle,
  ViewStyle,
  useColorScheme,
  ScrollViewProps,
} from 'react-native'

import { styles } from './Layout.styles'
import { COLORS } from '@/assets/styles/colors'
import Header, { HeaderProps } from '@/widgets/Header/Header'
import VariableSafeAreaView from '../VariableSafeAreaView/VariableSafeAreaView'
import { DismissKeyboardView } from '../DismissKeyboardHOC/DismissKeyboardHOC'

interface Props extends HeaderProps {
  children: ReactNode
  isScroll?: boolean
  statusBarStyle?: StatusBarStyle
  statusBarBackgroundColor?: ColorValue
  statusBarProps?: StatusBarProps
  safeAreaStyles?: ViewStyle
  scrollViewStyles?: ViewStyle
  paddingScreen?: boolean
  dismissKeyboard?: boolean
  showHeader?: boolean
  isSafeArea?: boolean
  header?: ReactNode
  scrollViewProps?: ScrollViewProps
}

/**
 * Враппер для всех экранов
 *
 * @format
 */

const Layout: FC<Props> = (props) => {
  const {
    children,
    isScroll,
    statusBarStyle,
    statusBarBackgroundColor,
    statusBarProps,
    safeAreaStyles,
    paddingScreen,
    scrollViewStyles,
    dismissKeyboard,
    showHeader,
    header,
    isSafeArea,
    scrollViewProps,
    ...headerProps
  } = props

  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = useMemo(() => {
    return isDarkMode ? COLORS.white : COLORS.white
  }, [isDarkMode])

  const overStylesSafeArea = useMemo(() => {
    return [
      styles.safeArea,
      showHeader && !isScroll && styles.showHeader,
      showHeader && isScroll && styles.showHeaderWithScroll,
      paddingScreen && styles.padding,
      safeAreaStyles,
    ]
  }, [safeAreaStyles])

  const overStylesScrollView = useMemo(() => {
    return [scrollViewStyles]
  }, [scrollViewStyles])

  return (
    <VariableSafeAreaView isSafeArea={!!isSafeArea} style={overStylesSafeArea}>
      {showHeader && <Header {...headerProps} />}
      {header}
      {/* <StatusBar
        barStyle={
          statusBarStyle ?? isDarkMode ? 'light-content' : 'dark-content'
        }
        backgroundColor={statusBarBackgroundColor || backgroundStyle}
        {...statusBarProps}
      /> */}

      {dismissKeyboard ? (
        <DismissKeyboardView>
          {isScroll ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={overStylesScrollView}
              {...scrollViewProps}
            >
              {children}
            </ScrollView>
          ) : (
            children
          )}
        </DismissKeyboardView>
      ) : isScroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={overStylesScrollView}
          {...scrollViewProps}
        >
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </VariableSafeAreaView>
  )
}

export default memo(Layout)
