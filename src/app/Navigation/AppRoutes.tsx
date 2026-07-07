import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import StartRoutes from './Stacks/StartStack'
import TabNavigation from './TabRoutes/TabRoutes'
import {useAppSelector} from '@/shared/hooks/useStore'
import ModalUpdateApp from '@/features/ModalUpdateApp/ModalUpdateApp'
import ModalYearResult from '@/features/ModalYearResult/ModalYearResult'
import ModalDailyStreakSuccess from '@/features/ModalDailyStreakSuccess/ModalDailyStreakSuccess'
import ModalAchievementUnlocked from '@/features/ModalAchievementUnlocked/ModalAchievementUnlocked'
import {RoutesNames} from './RoutesNames'
import {navigationRef} from './ref'
import {useNavTheme} from './hooks/useNavTheme'
import type {RootStackParams} from './params'
import { rootStackScreenOptions } from './config'

const Stack = createNativeStackNavigator<RootStackParams>()

const Routes = () => {
  const { isAuth } = useAppSelector((store) => store.app)
  const navTheme = useNavTheme()

  return (
    <>
      <NavigationContainer ref={navigationRef} theme={navTheme}>
        {isAuth ? (
          <TabNavigation />
        ) : (
          <Stack.Navigator screenOptions={rootStackScreenOptions}>
            <Stack.Screen
              name={RoutesNames.start}
              component={StartRoutes}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>

      <ModalUpdateApp />
      <ModalYearResult />
      <ModalDailyStreakSuccess />
      <ModalAchievementUnlocked />
    </>
  )
}

export default Routes
