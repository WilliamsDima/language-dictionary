import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { screenOptions, stackOptions } from '../config'
import { RoutesNames } from '../RoutesNames'
import ProfileScreen from '@/pages/ProfileScreen/ProfileScreen'

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
    </ProfileStack.Navigator>
  )
}

export default ProfileTabRoutes
