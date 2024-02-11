import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { screenOptions, stackOptions } from '../config'
import { RoutesNames } from '../RoutesNames'
import MainScreen from '@/pages/MainScreen/MainScreen'

const MainStack = createStackNavigator()

const MainTabRoutes = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        ...screenOptions,
        headerShown: false,
      }}
    >
      <MainStack.Screen
        options={stackOptions}
        name={RoutesNames.main}
        component={MainScreen}
      />
    </MainStack.Navigator>
  )
}

export default MainTabRoutes
