import React, { useMemo, FC, ReactNode, memo } from 'react'
import {
  ColorValue,
  ScrollView,
  StatusBarProps,
  StatusBarStyle,
  ViewStyle,
  ScrollViewProps,
} from 'react-native'

import { styles } from './Layout.styles'
import { COLORS } from '@/assets/styles/colors'
import Header, { HeaderProps } from '@/widgets/Header/Header'
import VariableSafeAreaView from '../VariableSafeAreaView/VariableSafeAreaView'
import { DismissKeyboardView } from '../DismissKeyboardHOC/DismissKeyboardHOC'
import { useAppSelector } from '@/shared/hooks/useStore'

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

  const { theme, hiddenTabBar } = useAppSelector((store) => store.app)

  const backgroundStyle = useMemo(() => {
    return theme === 'dark' ? COLORS.gray_bg : COLORS.white
  }, [theme])

  const overStylesSafeArea = useMemo(() => {
    return [
      styles.safeArea,
      showHeader && !isScroll && styles.showHeader,
      showHeader && isScroll && styles.showHeaderWithScroll,
      paddingScreen && styles.padding,
      safeAreaStyles,
      { backgroundColor: backgroundStyle },
      hiddenTabBar && styles.safeAreaHiddenTabBar,
    ]
  }, [safeAreaStyles, backgroundStyle, hiddenTabBar])

  const overStylesScrollView = useMemo(() => {
    return [scrollViewStyles]
  }, [scrollViewStyles])

  return (
    <VariableSafeAreaView isSafeArea={!!isSafeArea} style={overStylesSafeArea}>
      {showHeader && <Header {...headerProps} />}
      {header}

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
