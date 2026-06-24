import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import { CardsProvider } from './CardsContext'
import { useHiddenTabBar } from '@/shared/hooks/useHiddenTabBar'
import Slides from './UI/Slides/Slides'
import { useAdsScreen } from '@/shared/hooks/useAdsScreen'
import { useUserActivity } from '@/shared/hooks/useUserActivity'

const CardsRepetition: FC = () => {
  const { theme, rt } = useUnistyles()
  useHiddenTabBar()
  useAdsScreen()

  const { updateActivity } = useUserActivity()

  useEffect(() => {
    updateActivity({ startTraningCards: true })
  }, [])

  return (
    <CardsProvider>
      <Layout isSafeArea>
        <StatusBar
          backgroundColor={theme.colors.background.screen}
          translucent
          barStyle={rt.themeName === 'dark' ? 'light-content' : 'dark-content'}
        />

        <Slides />
      </Layout>
    </CardsProvider>
  )
}

export default CardsRepetition
