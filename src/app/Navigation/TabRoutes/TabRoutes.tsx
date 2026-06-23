import React, { useCallback, useState } from 'react'
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import type { RouteProp } from '@react-navigation/native'
import { View } from 'react-native'
import MainTabRoutes from '../TabStacks/MainTabRoutes'
import { RouteName, RoutesNames, TabsKeys } from '../RoutesNames'
import TabBar from '@/shared/UI/TabBar/TabBar'
import SettingsTabRoutes from '../TabStacks/SettingsTabRoutes'
import ProfileTabRoutes from '../TabStacks/ProfileTabRoutes'
import type { TabParamsList } from '../params'
import { tabScreenOptions } from '../config'
import VariableSafeAreaView from '@/shared/UI/VariableSafeAreaView/VariableSafeAreaView'
import { styles } from './TabRoutes.styles'
import TabsHero from './TabsHero'

const Tab = createBottomTabNavigator<TabParamsList>()
const TAB_DEFAULT_SCREEN_BY_STACK: Record<TabsKeys, RouteName> = {
  [RoutesNames.mainStack]: RoutesNames.main,
  [RoutesNames.settingsStack]: RoutesNames.settings,
  [RoutesNames.profileStack]: RoutesNames.profile,
}

type TabRoute = RouteProp<TabParamsList, TabsKeys>

/**
 * Панель нижней навигации
 *
 * @format
 */

const HomeTabsScreen = () => {
  const [activeTab, setActiveTab] = useState<TabsKeys>(RoutesNames.mainStack)
  const [activeScreen, setActiveScreen] = useState<RouteName | undefined>(
    RoutesNames.main
  )

  const renderTabBar = useCallback((props: BottomTabBarProps) => {
    return <TabBar {...props} />
  }, [])

  const updateActiveScreen = useCallback(
    (tabName: TabsKeys, route?: TabRoute) => {
      const focusedRouteName = route
        ? getFocusedRouteNameFromRoute(route)
        : undefined

      setActiveScreen(
        (focusedRouteName as RouteName | undefined) ??
          TAB_DEFAULT_SCREEN_BY_STACK[tabName]
      )
    },
    []
  )

  return (
    <VariableSafeAreaView isSafeArea style={styles.root}>
      <TabsHero tabName={activeTab} activeScreen={activeScreen} />

      <View style={styles.tabsArea}>
        <Tab.Navigator tabBar={renderTabBar} screenOptions={tabScreenOptions}>
          <Tab.Screen
            name={RoutesNames.mainStack}
            component={MainTabRoutes}
            listeners={({ route }) => ({
              focus: () => {
                setActiveTab(RoutesNames.mainStack)
                updateActiveScreen(RoutesNames.mainStack, route)
              },
              state: () => updateActiveScreen(RoutesNames.mainStack, route),
            })}
          />
          <Tab.Screen
            name={RoutesNames.settingsStack}
            component={SettingsTabRoutes}
            listeners={({ route }) => ({
              focus: () => {
                setActiveTab(RoutesNames.settingsStack)
                updateActiveScreen(RoutesNames.settingsStack, route)
              },
              state: () => updateActiveScreen(RoutesNames.settingsStack, route),
            })}
          />

          <Tab.Screen
            name={RoutesNames.profileStack}
            component={ProfileTabRoutes}
            listeners={({ route }) => ({
              focus: () => {
                setActiveTab(RoutesNames.profileStack)
                updateActiveScreen(RoutesNames.profileStack, route)
              },
              state: () => updateActiveScreen(RoutesNames.profileStack, route),
            })}
          />
        </Tab.Navigator>
      </View>
    </VariableSafeAreaView>
  )
}

export default HomeTabsScreen
