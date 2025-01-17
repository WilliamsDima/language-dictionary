import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { screenOptions, stackOptions } from '../config'
import { RoutesNames } from '../RoutesNames'
import ProfileScreen from '@/pages/ProfileScreen/ProfileScreen'
import CardsRepetition from '@/pages/CardsRepetition/CardsRepetition'

const ProfileStack = createStackNavigator()

const ProfileTabRoutes = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        ...screenOptions,
        headerShown: false,
      }}
    >
      <ProfileStack.Screen
        options={stackOptions}
        name={RoutesNames.profile}
        component={ProfileScreen}
      />

      <ProfileStack.Screen
        options={stackOptions}
        name={RoutesNames.cardsRepetition}
        component={CardsRepetition}
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileTabRoutes
