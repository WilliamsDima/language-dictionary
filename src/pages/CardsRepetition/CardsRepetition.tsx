import Layout from '@/shared/UI/Layout/Layout'
import React, { FC } from 'react'
import { StatusBar } from 'react-native'
import { styles } from './CardsRepetition.styles'
import { CardsProvider } from './CardsContext'
import { useHiddenTabBar } from '@/shared/hooks/useHiddenTabBar'
import { COLORS } from '@/assets/styles/colors'
import Slides from './UI/Slides/Slides'
import { useAdsScreen } from '@/shared/hooks/useAdsScreen'

const CardsRepetition: FC = () => {
  useHiddenTabBar()
  useAdsScreen()
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
