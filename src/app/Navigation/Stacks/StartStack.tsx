import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useStackScreenOptions } from '../config'
import { RoutesNames } from '../RoutesNames'
import AuthScreen from '@/processes/AuthScreen/AuthScreen'
import SplashScreen from '@/pages/SplashScreen/SplashScreen'
import { useAppSelector } from '@/shared/hooks/useStore'
import type { StartStackParams } from '../params'

const StartStack = createNativeStackNavigator<StartStackParams>()

/**
 * Экраны: Онбродинг, Авторизация, Код из СМС, Регистрация 1 - 4 шаги
 *
 * @format
 */

const StartRoutes = () => {
  const { isWatchSplash } = useAppSelector((store) => store.app)
  const { stackScreenOptions, startStackScreenOptions } = useStackScreenOptions()

  return (
    <StartStack.Navigator screenOptions={startStackScreenOptions}>
      {!isWatchSplash && (
        <StartStack.Screen
          options={stackScreenOptions}
          name={RoutesNames.splash}
          component={SplashScreen}
        />
      )}

      <StartStack.Screen
        options={stackScreenOptions}
        name={RoutesNames.auth}
        component={AuthScreen}
      />
    </StartStack.Navigator>
  )
}

export default StartRoutes
