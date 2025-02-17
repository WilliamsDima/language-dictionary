import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { styles } from './CardsRepetition.styles'
import { CardsProvider } from './CardsContext'
import { useHiddenTabBar } from '@/shared/hooks/useHiddenTabBar'
import { COLORS } from '@/assets/styles/colors'
import Slides from './UI/Slides/Slides'
import { useAdsScreen } from '@/shared/hooks/useAdsScreen'
import { useUserActivity } from '@/shared/hooks/useUserActivity'

const CardsRepetition: FC = () => {
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
          backgroundColor={COLORS.gray_bg}
          translucent
          barStyle={'light-content'}
        />

        <Slides />
      </Layout>
    </CardsProvider>
  )
}

export default CardsRepetition
