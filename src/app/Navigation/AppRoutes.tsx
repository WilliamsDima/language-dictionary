import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { RoutesNames } from './RoutesNames'
import StartRoutes from './Stacks/StartStack'
import TabNavigation from './TabRoutes'

export type AppParamsList = {
  [RoutesNames.start]: undefined
}

const Stack = createStackNavigator<AppParamsList>()

const Routes = () => {
  return (
    <>
      <NavigationContainer>
        {false ? (
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
    </>
  )
}

export default Routes
