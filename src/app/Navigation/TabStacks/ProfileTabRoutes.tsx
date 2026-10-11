import React, { useMemo } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useStackScreenOptions } from '../config'
import { RoutesNames } from '../RoutesNames'
import ProfileScreen from '@/pages/ProfileScreen/ProfileScreen'
import CardsRepetition from '@/pages/CardsRepetition/CardsRepetition'
import type { ProfileStackParams } from '../params'
import AchievementsScreen from '@/pages/AchievementsScreen/AchievementsScreen'
import { useTranslation } from '@/shared/i18n/types'

const ProfileStack = createNativeStackNavigator<ProfileStackParams>()

const ProfileTabRoutes = () => {
  const { stackScreenOptions, tabStackScreenOptions } = useStackScreenOptions()
  const { t } = useTranslation()

  const achievementsScreenOptions = useMemo(
    () => ({
      ...stackScreenOptions,
      title: t('profileScreen.achievements'),
    }),
    [stackScreenOptions, t]
  )

  return (
    <ProfileStack.Navigator screenOptions={tabStackScreenOptions}>
      <ProfileStack.Screen
        options={stackScreenOptions}
        name={RoutesNames.profile}
        component={ProfileScreen}
      />

      <ProfileStack.Screen
        options={achievementsScreenOptions}
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
