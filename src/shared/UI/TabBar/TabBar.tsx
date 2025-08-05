import React, { FC, memo, useEffect, useMemo } from 'react'

import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native'
import { styles } from './TabBar.styles'
import { TabsKeys } from '@/app/Navigation/RoutesNames'
import { Shadow } from 'react-native-shadow-2'
import ButtonTabBar from '../ButtonTabBar/ButtonTabBar'
import { useAppSelector } from '@/shared/hooks/useStore'
import { COLORS } from '@/assets/styles/colors'
import changeNavigationBarColor from 'react-native-navigation-bar-color'

type Props = {
  state: TabNavigationState<ParamListBase>
  descriptors: any
  navigation: NavigationHelpers<ParamListBase, any>
}

const TabBar: FC<Props> = (props) => {
  const { state, navigation } = props

  const { theme, hiddenTabBar } = useAppSelector((store) => store.app)

  const colorShdow = useMemo(() => {
    return theme === 'dark' ? COLORS.gray_bg : COLORS.white
  }, [theme])

  const backgroundColor = useMemo(() => {
    return theme === 'dark' ? COLORS.tab_bar_dark : COLORS.white
  }, [theme])

  const tabTitles = useMemo(() => {
    return ['Слова', 'Настройки', 'Профиль']
  }, [])

  const setColorForNavigationBar = async (isChange: boolean) => {
    try {
      await changeNavigationBarColor(
        isChange ? COLORS.black : COLORS.tab_bar_dark,
        false,
        false
      )
    } catch (e) {
      console.log('error setColorForNavigationBar', e)
    }
  }

  useEffect(() => {
    setColorForNavigationBar(hiddenTabBar)
  }, [hiddenTabBar])

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

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <ButtonTabBar
            key={index}
            onPress={onPress}
            isFocused={isFocused}
            assetNames={tabTitles[index]}
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
