import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { stackScreenOptions, tabStackScreenOptions } from '../config'
import { RoutesNames } from '../RoutesNames'
import ProfileScreen from '@/pages/ProfileScreen/ProfileScreen'
import CardsRepetition from '@/pages/CardsRepetition/CardsRepetition'
import type { ProfileStackParams } from '../params'

const ProfileStack = createNativeStackNavigator<ProfileStackParams>()

const ProfileTabRoutes = () => {
  return (
    <ProfileStack.Navigator screenOptions={tabStackScreenOptions}>
      <ProfileStack.Screen
        options={stackScreenOptions}
        name={RoutesNames.profile}
        component={ProfileScreen}
      />

      <ProfileStack.Screen
        options={stackScreenOptions}
        name={RoutesNames.cardsRepetition}
        component={CardsRepetition}
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileTabRoutes
