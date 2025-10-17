import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useEffect, useState } from 'react'
import { View } from 'react-native'
import { styles } from './SplashScreen.styles'
import LottieView from 'lottie-react-native'
import { useHiddenTabBar } from '@/shared/hooks/useHiddenTabBar'
import { useAppNavigation } from '@/shared/hooks/useNavigation'
import { RoutesNames } from '@/app/Navigation/RoutesNames'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import { changeLanguage, initI18n } from '@/shared/i18n'
import { getAsyncLocal, setAsyncLocal } from '@/shared/helpers/asyncStorage'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'
import type { TranslationKeys } from '@/shared/store/slice/appSlice'

const SplashScreen: FC = () => {
  useHiddenTabBar()

  const { setIsWatchSplash, setAppLanguage } = useActions()

  const [ready, setReady] = useState(false)

  const { isAuth, aplication } = useAppSelector((store) => store.app)

  const { replace } = useAppNavigation()

  useEffect(() => {
    if (aplication) {
      ;(async () => {
        const localLang = (await getAsyncLocal(
          LOCAL_KEYS.appLanguage,
          true
        )) as TranslationKeys
        // default
        const leng = aplication.appLanguages[localLang || 'en']
        setAppLanguage(leng)
        const path = aplication.translations[leng.code]
        await initI18n()
        await changeLanguage(leng.code, path)
        await setAsyncLocal(LOCAL_KEYS.appLanguage, leng.code)
        setReady(true)
      })()
    }
  }, [aplication])

  useEffect(() => {
    let id: NodeJS.Timeout
    if (ready) {
      id = setTimeout(() => {
        replace(isAuth ? RoutesNames.main : RoutesNames.auth)
        setIsWatchSplash(true)
      }, 5000)
    }

    return () => {
      clearTimeout(id)
    }
  }, [replace, isAuth, ready])

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
