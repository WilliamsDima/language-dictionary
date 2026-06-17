import React, { FC, memo, useMemo } from 'react'
import { useUnistyles } from 'react-native-unistyles'

import { type BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { styles } from './TabBar.styles'
import { TabsKeys } from '@/app/Navigation/RoutesNames'
import { Shadow } from 'react-native-shadow-2'
import ButtonTabBar from '../ButtonTabBar/ButtonTabBar'
import { useAppSelector } from '@/shared/hooks/useStore'

const TabBar: FC<BottomTabBarProps> = (props) => {
  const { state, navigation } = props

  const { hiddenTabBar } = useAppSelector((store) => store.app)
  const { theme, rt } = useUnistyles()

  const colorShdow = useMemo(() => {
    return rt.themeName === 'dark'
      ? theme.colors.palette.gray_bg
      : theme.colors.palette.white
  }, [rt.themeName, theme.colors.palette.gray_bg, theme.colors.palette.white])

  const backgroundColor = useMemo(() => {
    return rt.themeName === 'dark'
      ? theme.colors.palette.tab_bar_dark
      : theme.colors.palette.white
  }, [rt.themeName, theme.colors.palette.tab_bar_dark, theme.colors.palette.white])

  const tabTitles = useMemo<Record<TabsKeys, string>>(() => {
    return {
      mainStack: 'Слова',
      settingsStack: 'Настройки',
      profileStack: 'Профиль',
    }
  }, [])

  return !hiddenTabBar ? (
    <Shadow
      containerStyle={[styles.containerStyle, { backgroundColor: colorShdow }]}
      style={[styles.tab, { backgroundColor }]}
    >
      {state?.routes.map((route, index) => {
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !(event as {defaultPrevented?: boolean}).defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <ButtonTabBar
            key={index}
            onPress={onPress}
            isFocused={isFocused}
            assetNames={tabTitles[route.name as TabsKeys]}
            routeName={route.name as TabsKeys}
          />
        )
      })}
    </Shadow>
  ) : (
    <></>
  )
}

export default memo(TabBar)
