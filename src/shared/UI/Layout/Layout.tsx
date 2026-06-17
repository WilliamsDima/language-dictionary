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
import { useUnistyles } from 'react-native-unistyles'

import { styles } from './Layout.styles'
import VariableSafeAreaView from '../VariableSafeAreaView/VariableSafeAreaView'
import { DismissKeyboardView } from '../DismissKeyboardHOC/DismissKeyboardHOC'
import { useAppSelector } from '@/shared/hooks/useStore'
import ScreenBackground from './ScreenBackground'
import { View } from 'react-native'

interface Props {
  children: ReactNode
  isScroll?: boolean
  statusBarStyle?: StatusBarStyle
  statusBarBackgroundColor?: ColorValue
  statusBarProps?: StatusBarProps
  safeAreaStyles?: StyleProp<ViewStyle>
  scrollViewStyles?: StyleProp<ViewStyle>
  paddingScreen?: boolean
  dismissKeyboard?: boolean
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
    safeAreaStyles,
    paddingScreen,
    scrollViewStyles,
    dismissKeyboard,
    header,
    isSafeArea,
    scrollViewProps,
    ...headerProps
  } = props

  const { hiddenTabBar } = useAppSelector((store) => store.app)
  const { theme } = useUnistyles()

  styles.useVariants({
    headerSpacing: isScroll ? 'scroll' : 'top',
    paddingScreen,
    hiddenTabBar,
  })

  const overStylesSafeArea = useMemo(() => {
    return [
      styles.safeArea,
      safeAreaStyles,
      { backgroundColor: theme.colors.background.screen },
    ]
  }, [safeAreaStyles, theme.colors.background.screen])

  const overStylesScrollView = useMemo(() => {
    return [scrollViewStyles]
  }, [scrollViewStyles])

  return (
    <VariableSafeAreaView isSafeArea={!!isSafeArea} style={overStylesSafeArea}>
      <ScreenBackground />
      <View style={styles.content}>
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
