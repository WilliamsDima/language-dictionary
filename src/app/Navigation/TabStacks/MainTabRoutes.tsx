import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { stackScreenOptions, tabStackScreenOptions } from '../config'
import { RoutesNames } from '../RoutesNames'
import MainScreen from '@/pages/MainScreen/MainScreen'
import SplashScreen from '@/pages/SplashScreen/SplashScreen'
import { useAppSelector } from '@/shared/hooks/useStore'
import { CardProvider } from '@/shared/hooks/useCardsContext'
import type { MainStackParams } from '../params'

const MainStack = createNativeStackNavigator<MainStackParams>()

const MainScreenWithProvider = () => {
  return (
    <CardProvider>
      <MainScreen />
    </CardProvider>
  )
}

const MainTabRoutes = () => {
  const { isWatchSplash } = useAppSelector((store) => store.app)

  return (
    <MainStack.Navigator screenOptions={tabStackScreenOptions}>
      {!isWatchSplash && (
        <MainStack.Screen
          options={stackScreenOptions}
          name={RoutesNames.splash}
          component={SplashScreen}
        />
      )}

      <MainStack.Screen
        options={stackScreenOptions}
        name={RoutesNames.main}
        component={MainScreenWithProvider}
      />
    </MainStack.Navigator>
  )
}

export default MainTabRoutes
