import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useStackScreenOptions } from '../config'
import { RoutesNames } from '../RoutesNames'
import ProfileScreen from '@/pages/ProfileScreen/ProfileScreen'
import CardsRepetition from '@/pages/CardsRepetition/CardsRepetition'
import type { ProfileStackParams } from '../params'
import AchievementsScreen from '@/pages/AchievementsScreen/AchievementsScreen'

const ProfileStack = createNativeStackNavigator<ProfileStackParams>()

const ProfileTabRoutes = () => {
  const { stackScreenOptions, tabStackScreenOptions } = useStackScreenOptions()

  return (
    <ProfileStack.Navigator screenOptions={tabStackScreenOptions}>
      <ProfileStack.Screen
        options={stackScreenOptions}
        name={RoutesNames.profile}
        component={ProfileScreen}
      />

      <ProfileStack.Screen
        options={{
          ...stackScreenOptions,
          title: 'Достижения',
        }}
        name={RoutesNames.achievements}
        component={AchievementsScreen}
      />

      <ProfileStack.Screen
        options={tabStackScreenOptions}
        name={RoutesNames.cardsRepetition}
        component={CardsRepetition}
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileTabRoutes
