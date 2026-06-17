import React, { useCallback } from 'react'
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import MainTabRoutes from '../TabStacks/MainTabRoutes'
import { RoutesNames } from '../RoutesNames'
import TabBar from '@/shared/UI/TabBar/TabBar'
import SettingsTabRoutes from '../TabStacks/SettingsTabRoutes'
import ProfileTabRoutes from '../TabStacks/ProfileTabRoutes'
import { useTimeTracker } from '@/shared/hooks/useTimeTracker'
import type { TabParamsList } from '../params'
import { tabScreenOptions } from '../config'
import VariableSafeAreaView from '@/shared/UI/VariableSafeAreaView/VariableSafeAreaView'
import { styles } from './TabRoutes.styles'

const Tab = createBottomTabNavigator<TabParamsList>()

/**
 * Панель нижней навигации
 *
 * @format
 */

const HomeTabsScreen = () => {
  useTimeTracker()

  const renderTabBar = useCallback((props: BottomTabBarProps) => {
    return <TabBar {...props} />
  }, [])

  return (
    <VariableSafeAreaView isSafeArea style={styles.root}>
      <View style={styles.shadowBand} pointerEvents="none" />

      <View style={styles.tabsArea}>
        <Tab.Navigator tabBar={renderTabBar} screenOptions={tabScreenOptions}>
          <Tab.Screen name={RoutesNames.mainStack} component={MainTabRoutes} />
          <Tab.Screen
            name={RoutesNames.settingsStack}
            component={SettingsTabRoutes}
          />

          <Tab.Screen
            name={RoutesNames.profileStack}
            component={ProfileTabRoutes}
          />
        </Tab.Navigator>
      </View>
    </VariableSafeAreaView>
  )
}

export default HomeTabsScreen
