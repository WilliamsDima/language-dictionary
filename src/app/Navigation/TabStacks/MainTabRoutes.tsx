import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { screenOptions, stackOptions } from '../config'
import { RoutesNames } from '../RoutesNames'
import MainScreen from '@/pages/MainScreen/MainScreen'
import SplashScreen from '@/pages/SplashScreen/SplashScreen'
import { useAppSelector } from '@/shared/hooks/useStore'

const MainStack = createStackNavigator()

const MainTabRoutes = () => {
  const { isWatchSplash } = useAppSelector((store) => store.app)

  return (
    <MainStack.Navigator
      screenOptions={{
        ...screenOptions,
        headerShown: false,
      }}
    >
      {!isWatchSplash && (
        <MainStack.Screen
          options={stackOptions}
          name={RoutesNames.splash}
          component={SplashScreen}
        />
      )}

      <MainStack.Screen
        options={stackOptions}
        name={RoutesNames.main}
        component={MainScreen}
      />
    </MainStack.Navigator>
  )
}

export default MainTabRoutes
