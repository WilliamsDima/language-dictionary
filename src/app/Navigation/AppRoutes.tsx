import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import StartRoutes from './Stacks/StartStack'
import TabNavigation from './TabRoutes'
import {useAppSelector} from '@/shared/hooks/useStore'
import Tooltip from '@/entities/Tooltip/UI/Tooltip'
import ModalUpdateApp from '@/features/ModalUpdateApp/ModalUpdateApp'
import ModalYearResult from '@/features/ModalYearResult/ModalYearResult'
import {RoutesNames} from './RoutesNames'
import {navigationRef} from './ref'
import {useNavTheme} from './hooks/useNavTheme'
import type {RootParams} from './params'

const Stack = createStackNavigator<RootParams>()

const Routes = () => {
  const { isAuth } = useAppSelector((store) => store.app)
  const navTheme = useNavTheme()

  return (
    <>
      <NavigationContainer ref={navigationRef} theme={navTheme}>
        {isAuth ? (
          <TabNavigation />
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name={RoutesNames.start}
              component={StartRoutes}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>

      <Tooltip />
      <ModalUpdateApp />
      <ModalYearResult />
    </>
  )
}

export default Routes
