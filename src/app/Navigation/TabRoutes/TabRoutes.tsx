import React, { useCallback, useState } from 'react'
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import MainTabRoutes from '../TabStacks/MainTabRoutes'
import { RoutesNames, TabsKeys } from '../RoutesNames'
import TabBar from '@/shared/UI/TabBar/TabBar'
import SettingsTabRoutes from '../TabStacks/SettingsTabRoutes'
import ProfileTabRoutes from '../TabStacks/ProfileTabRoutes'
import type { TabParamsList } from '../params'
import { tabScreenOptions } from '../config'
import VariableSafeAreaView from '@/shared/UI/VariableSafeAreaView/VariableSafeAreaView'
import { styles } from './TabRoutes.styles'
import TabsHero from './TabsHero'

const Tab = createBottomTabNavigator<TabParamsList>()

/**
 * Панель нижней навигации
 *
 * @format
 */

const HomeTabsScreen = () => {
  const [activeTab, setActiveTab] = useState<TabsKeys>(RoutesNames.mainStack)

  const renderTabBar = useCallback((props: BottomTabBarProps) => {
    return <TabBar {...props} />
  }, [])

  return (
    <VariableSafeAreaView isSafeArea style={styles.root}>
      <View style={styles.shadowBand} pointerEvents="none" />
      <TabsHero tabName={activeTab} />

      <View style={styles.tabsArea}>
        <Tab.Navigator tabBar={renderTabBar} screenOptions={tabScreenOptions}>
          <Tab.Screen
            name={RoutesNames.mainStack}
            component={MainTabRoutes}
            listeners={{ focus: () => setActiveTab(RoutesNames.mainStack) }}
          />
          <Tab.Screen
            name={RoutesNames.settingsStack}
            component={SettingsTabRoutes}
            listeners={{
              focus: () => setActiveTab(RoutesNames.settingsStack),
            }}
          />

          <Tab.Screen
            name={RoutesNames.profileStack}
            component={ProfileTabRoutes}
            listeners={{
              focus: () => setActiveTab(RoutesNames.profileStack),
            }}
          />
        </Tab.Navigator>
      </View>
    </VariableSafeAreaView>
  )
}

export default HomeTabsScreen
