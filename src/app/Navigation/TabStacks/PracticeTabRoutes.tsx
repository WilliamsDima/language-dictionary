import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useStackScreenOptions } from '../config'
import { RoutesNames } from '../RoutesNames'
import PracticeScreen from '@/pages/PracticeScreen/PracticeScreen'
import PracticeSession from '@/pages/PracticeSession/PracticeSession'
import CardsRepetition from '@/pages/CardsRepetition/CardsRepetition'
import type { PracticeStackParams } from '../params'

const PracticeStack = createNativeStackNavigator<PracticeStackParams>()

const PracticeTabRoutes = () => {
  const { stackScreenOptions, tabStackScreenOptions } = useStackScreenOptions()

  return (
    <PracticeStack.Navigator screenOptions={tabStackScreenOptions}>
      <PracticeStack.Screen
        options={stackScreenOptions}
        name={RoutesNames.practice}
        component={PracticeScreen}
      />
      <PracticeStack.Screen
        options={tabStackScreenOptions}
        name={RoutesNames.practiceSession}
        component={PracticeSession}
      />
      <PracticeStack.Screen
        options={tabStackScreenOptions}
        name={RoutesNames.cardsRepetition}
        component={CardsRepetition}
      />
    </PracticeStack.Navigator>
  )
}

export default PracticeTabRoutes
