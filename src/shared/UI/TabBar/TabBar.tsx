import React, { FC, memo, useEffect, useMemo } from 'react'
import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types'
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
  descriptors: BottomTabDescriptorMap
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>
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
      const response = await changeNavigationBarColor(
        isChange ? COLORS.red : COLORS.red,
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
          if (route?.state?.routeNames) {
            navigation.navigate(route?.state?.routeNames[0])
          } else {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, { merge: true })
            }
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
