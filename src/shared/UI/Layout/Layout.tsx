import React, { useMemo, FC, ReactNode, memo } from 'react'
import {
  Animated,
  ColorValue,
  StyleProp,
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
import ScreenBackground from './ScreenBackground'
import { View } from 'react-native'

interface Props extends HeaderProps {
  children: ReactNode
  isScroll?: boolean
  statusBarStyle?: StatusBarStyle
  statusBarBackgroundColor?: ColorValue
  statusBarProps?: StatusBarProps
  safeAreaStyles?: StyleProp<ViewStyle>
  scrollViewStyles?: StyleProp<ViewStyle>
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
      <ScreenBackground />
      <View style={styles.content}>
        {showHeader && <Header {...headerProps} />}
        {header}

        {dismissKeyboard ? (
          <DismissKeyboardView style={styles.content}>
            {isScroll ? (
              <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                style={overStylesScrollView}
                {...scrollViewProps}
              >
                {children}
              </Animated.ScrollView>
            ) : (
              children
            )}
          </DismissKeyboardView>
        ) : isScroll ? (
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            style={overStylesScrollView}
            {...scrollViewProps}
          >
            {children}
          </Animated.ScrollView>
        ) : (
          children
        )}
      </View>
    </VariableSafeAreaView>
  )
}

export default memo(Layout)
