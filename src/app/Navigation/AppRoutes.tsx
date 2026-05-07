import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { RoutesNames } from './RoutesNames'
import StartRoutes from './Stacks/StartStack'
import TabNavigation from './TabRoutes'
import { useAppSelector } from '@/shared/hooks/useStore'
import Tooltip from '@/entities/Tooltip/UI/Tooltip'
import ModalUpdateApp from '@/features/ModalUpdateApp/ModalUpdateApp'
import ModalYearResult from '@/features/ModalYearResult/ModalYearResult'

export type AppParamsList = {
  [RoutesNames.start]: undefined
}

const Stack = createStackNavigator<AppParamsList>()

const Routes = () => {
  const { isAuth } = useAppSelector((store) => store.app)

  return (
    <>
      <NavigationContainer>
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
