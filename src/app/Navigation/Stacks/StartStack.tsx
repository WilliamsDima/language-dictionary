import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { screenOptions, stackOptions } from '../config'
import { RoutesNames } from '../RoutesNames'
import AuthScreen from '@/processes/AuthScreen/AuthScreen'
import SplashScreen from '@/pages/SplashScreen/SplashScreen'
import { useAppSelector } from '@/shared/hooks/useStore'

export type StartParamsList = {
  [RoutesNames.auth]: undefined
  [RoutesNames.splash]: undefined
}

const StartStack = createStackNavigator<StartParamsList>()

/**
 * Экраны: Онбродинг, Авторизация, Код из СМС, Регистрация 1 - 4 шаги
 *
 * @format
 */

const StartRoutes = () => {
  const { isWatchSplash } = useAppSelector((store) => store.app)
  return (
    <StartStack.Navigator
      screenOptions={{
        ...screenOptions,
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      {!isWatchSplash && (
        <StartStack.Screen
          options={stackOptions}
          name={RoutesNames.splash}
          component={SplashScreen}
        />
      )}

      <StartStack.Screen
        options={stackOptions}
        name={RoutesNames.auth}
        component={AuthScreen}
      />
    </StartStack.Navigator>
  )
}

export default StartRoutes
