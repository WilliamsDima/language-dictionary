import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useStackScreenOptions } from '../config'
import { RoutesNames } from '../RoutesNames'
import SettingsScreen from '@/pages/SettingsScreen/SettingsScreen'
import type { SettingsStackParams } from '../params'
import CardsRepetition from '@/pages/CardsRepetition/CardsRepetition'

const SettingsStack = createNativeStackNavigator<SettingsStackParams>()

const SettingsTabRoutes = () => {
  const { stackScreenOptions, tabStackScreenOptions } = useStackScreenOptions()

  return (
    <SettingsStack.Navigator screenOptions={tabStackScreenOptions}>
      <SettingsStack.Screen
        options={stackScreenOptions}
        name={RoutesNames.settings}
        component={SettingsScreen}
      />
      <SettingsStack.Screen
        options={tabStackScreenOptions}
        name={RoutesNames.cardsRepetition}
        component={CardsRepetition}
      />
    </SettingsStack.Navigator>
  )
}

export default SettingsTabRoutes
