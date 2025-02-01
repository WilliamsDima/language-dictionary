import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { screenOptions, stackOptions } from '../config'
import { RoutesNames } from '../RoutesNames'
import MainScreen from '@/pages/MainScreen/MainScreen'
import SplashScreen from '@/pages/SplashScreen/SplashScreen'
import { useAppSelector } from '@/shared/hooks/useStore'
import { MainProvider } from '@/shared/hooks/useMainScreen'

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

      <MainStack.Screen options={stackOptions} name={RoutesNames.main}>
        {(props) => (
          <MainProvider {...props}>
            <MainScreen />
          </MainProvider>
        )}
      </MainStack.Screen>
    </MainStack.Navigator>
  )
}

export default MainTabRoutes
