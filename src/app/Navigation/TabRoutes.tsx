import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MainTabRoutes from './TabStacks/MainTabRoutes'
import { RoutesNames } from './RoutesNames'
import TabBar from '@/shared/UI/TabBar/TabBar'
import SettingsTabRoutes from './TabStacks/SettingsTabRoutes'
import ProfileTabRoutes from './TabStacks/ProfileTabRoutes'
import { useTimeTracker } from '@/shared/hooks/useTimeTracker'

export type TabParamsList = {
  [RoutesNames.mainStack]: undefined
  [RoutesNames.settingsStack]: undefined
  [RoutesNames.profileStack]: undefined
}

const Tab = createBottomTabNavigator<TabParamsList>()

/**
 * Панель нижней навигации
 *
 * @format
 */

const TabNavigation = () => {
  useTimeTracker()

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name={RoutesNames.mainStack}
        component={MainTabRoutes}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name={RoutesNames.settingsStack}
        component={SettingsTabRoutes}
      />

      <Tab.Screen
        options={{ headerShown: false }}
        name={RoutesNames.profileStack}
        component={ProfileTabRoutes}
      />
    </Tab.Navigator>
  )
}

export default TabNavigation
