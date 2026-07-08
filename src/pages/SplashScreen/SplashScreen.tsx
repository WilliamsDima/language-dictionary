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
import { useInterfaceLanguages } from '@/shared/hooks/useInterfaceLanguages'
import { getAsyncLocal, setAsyncLocal } from '@/shared/helpers/asyncStorage'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'
import type { TranslationKeys } from '@/shared/store/slice/appSlice'
import Text from '@/shared/UI/Text/Text'

const SplashScreen: FC = () => {
  useHiddenTabBar()

  const { setIsWatchSplash, setAppLanguage } = useActions()

  const [ready, setReady] = useState(false)

  const { isAuth } = useAppSelector((store) => store.app)
  const { languages, apiLanguages } = useInterfaceLanguages()

  const { replace } = useAppNavigation()

  useEffect(() => {
    if (languages.length === 0) return
    ;(async () => {
      const localLang = (await getAsyncLocal(
        LOCAL_KEYS.appLanguage,
        true
      )) as TranslationKeys | undefined
      // default
      const leng =
        languages.find((item) => item.code === (localLang || 'en')) ??
        languages.find((item) => item.code === 'ru') ??
        languages[0]

      setAppLanguage(leng)
      await initI18n()
      await changeLanguage(leng.code, apiLanguages)
      await setAsyncLocal(LOCAL_KEYS.appLanguage, leng.code)
      setReady(true)
    })()
  }, [apiLanguages, languages, setAppLanguage])

  useEffect(() => {
    const id = ready
      ? setTimeout(() => {
          replace(isAuth ? RoutesNames.main : RoutesNames.auth)
          setIsWatchSplash(true)
        }, 5000)
      : undefined

    return () => {
      id && clearTimeout(id)
    }
  }, [replace, isAuth, ready, setIsWatchSplash])

  return (
    <Layout>
      <View style={styles.screen}>
        <Text style={styles.title}>Nori</Text>
        <Text style={styles.subtitle}>
          Прокачиваем словарный запас через живые карточки
        </Text>
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
