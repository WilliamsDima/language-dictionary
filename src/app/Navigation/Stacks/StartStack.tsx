import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { screenOptions, stackOptions } from '../config'
import { RoutesNames } from '../RoutesNames'
import AuthScreen from '@/processes/AuthScreen/AuthScreen'

export type StartParamsList = {
  [RoutesNames.auth]: undefined
}

const StartStack = createStackNavigator<StartParamsList>()

/**
 * Экраны: Онбродинг, Авторизация, Код из СМС, Регистрация 1 - 4 шаги
 *
 * @format
 */

const StartRoutes = () => {
  return (
    <StartStack.Navigator
      screenOptions={{
        ...screenOptions,
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <StartStack.Screen
        options={stackOptions}
        name={RoutesNames.auth}
        component={AuthScreen}
      />
    </StartStack.Navigator>
  )
}

export default StartRoutes
