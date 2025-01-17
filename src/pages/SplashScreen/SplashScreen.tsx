import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useEffect } from 'react'
import { View } from 'react-native'
import { styles } from './SplashScreen.styles'
import LottieView from 'lottie-react-native'
import { useHiddenTabBar } from '@/shared/hooks/useHiddenTabBar'
import { useAppNavigation } from '@/shared/hooks/useNavigation'
import { RoutesNames } from '@/app/Navigation/RoutesNames'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'

const SplashScreen: FC = () => {
  useHiddenTabBar()

  const { setIsWatchSplash } = useActions()

  const { isAuth } = useAppSelector((store) => store.app)

  const { replace } = useAppNavigation()

  useEffect(() => {
    let id = setTimeout(() => {
      replace(isAuth ? RoutesNames.main : RoutesNames.auth)
      setIsWatchSplash(true)
    }, 5000)

    return () => {
      clearTimeout(id)
    }
  }, [replace, isAuth])

  return (
    <Layout>
      <View style={styles.screen}>
        <LottieView
          style={styles.words}
          source={require('./anim-words.json')}
          autoPlay
          loop
        />

        <LottieView
          style={styles.planet}
          source={require('./anim-planet.json')}
          autoPlay
          loop
        />
      </View>
    </Layout>
  )
}

export default SplashScreen
