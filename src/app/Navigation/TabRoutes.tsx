import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MainTabRoutes from './TabStacks/MainTabRoutes'
import { RoutesNames } from './RoutesNames'
import TabBar from '@/shared/UI/TabBar/TabBar'

export type TabParamsList = {
  [RoutesNames.mainStack]: undefined
}

const Tab = createBottomTabNavigator<TabParamsList>()

/**
 * Панель нижней навигации
 *
 * @format
 */

const TabNavigation = () => {
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
    </Tab.Navigator>
  )
}

export default TabNavigation
