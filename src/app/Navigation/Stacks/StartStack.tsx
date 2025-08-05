import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { screenOptions, stackOptions } from '../config'
import { RoutesNames } from '../RoutesNames'
import AuthScreen from '@/processes/AuthScreen/AuthScreen'
import SplashScreen from '@/pages/SplashScreen/SplashScreen'
import { useAppSelector } from '@/shared/hooks/useStore'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { COLORS } from '@/assets/styles/colors'

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

  const setColorForNavigationBar = async () => {
    try {
      await changeNavigationBarColor(COLORS.gray_bg, false, false)
    } catch (e) {
      console.log('error setColorForNavigationBar', e)
    }
  }

  useEffect(() => {
    if (isWatchSplash) setColorForNavigationBar()
  }, [isWatchSplash])

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
