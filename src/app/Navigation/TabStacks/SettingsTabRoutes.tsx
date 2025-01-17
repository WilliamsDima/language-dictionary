import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { screenOptions, stackOptions } from '../config'
import { RoutesNames } from '../RoutesNames'
import SettingsScreen from '@/pages/SettingsScreen/SettingsScreen'

const SettingsStack = createStackNavigator()

const SettingsTabRoutes = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        ...screenOptions,
        headerShown: false,
      }}
    >
      <SettingsStack.Screen
        options={stackOptions}
        name={RoutesNames.settings}
        component={SettingsScreen}
      />
    </SettingsStack.Navigator>
  )
}

export default SettingsTabRoutes
