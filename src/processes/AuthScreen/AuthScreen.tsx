import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useEffect, useMemo, useRef } from 'react'
import { Animated, Easing, Image, TouchableOpacity, View } from 'react-native'
import ButtonGoogle from './UI/ButtonGoogle/ButtonGoogle'
import { styles } from './AuthScreen.styles'
import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useTranslation } from '@/shared/i18n/types'
import CountryFlag from 'react-native-country-flag'
import { useBottomSheet } from '@/shared/UI/BottomSheet/hooks/useBottomSheet'
import ArrowDownIcon from '@/assets/icons/UI/arrow-down-green-64.svg'
import ModalInterfaceLanguage from '@/features/ModalInterfaceLanguage/ModalInterfaceLanguage'

const AuthScreen: FC = () => {
  const { appLanguage } = useAppSelector((store) => store.app)
  const { t } = useTranslation()
  const [sheetRef, presentSheet, dismissSheet] = useBottomSheet()
  const floatAnim = useRef(new Animated.Value(0)).current

  const selectedFlag = useMemo(() => {
    if (!appLanguage) {
      return <Text style={styles.selectorFallback}>🌍</Text>
    }

    return (
      <View style={styles.iconSelect}>
        <CountryFlag
          isoCode={appLanguage.emoji.toLocaleLowerCase()}
          size={40}
        />
      </View>
    )
  }, [appLanguage])

  const selectorDescription = useMemo(() => {
    if (!appLanguage) {
      return t('auth.choose_interface_language')
    }

    return appLanguage.name
  }, [appLanguage, t])

  const selectorTitle = useMemo(() => {
    if (!appLanguage) {
      return t('ui.language_not_select')
    }

    return appLanguage.nativeName
  }, [appLanguage, t])

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [floatAnim])

  const heroTranslate = useMemo(() => {
    return floatAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -12],
    })
  }, [floatAnim])

  return (
    <Layout>
      <View style={styles.screen}>
        <View style={styles.heroCard}>
          <View style={styles.heroCopy}>
            <Text style={styles.badge}>{t('auth.badge')}</Text>
            <Text style={styles.title}>{t('auth.title')}</Text>
            <Text style={styles.subtitle}>
              {t('auth.subtitle')}
            </Text>
          </View>

          <Animated.View
            style={[
              styles.heroVisual,
              { transform: [{ translateY: heroTranslate }] },
            ]}
          >
            <Image
              source={require('../../assets/images/languages.png')}
              style={styles.heroImage}
            />
          </Animated.View>
        </View>

        <View style={styles.mascotWrapper}>
          <Image
            source={require('../../assets/images/maskot.png')}
            style={styles.mascotImage}
          />
        </View>

        <View style={styles.controlsCard}>
          <Text style={styles.controlsTitle}>
            {t('auth.controls_title')}
          </Text>

          <TouchableOpacity style={styles.selector} onPress={presentSheet}>
            <View style={styles.selectorFlag}>{selectedFlag}</View>

            <View style={styles.selectorCopy}>
              <Text style={styles.selectorLabel}>
                {t('settingsScreen.interface_language')}
              </Text>
              <Text style={styles.selectorValue}>{selectorTitle}</Text>
              <Text style={styles.selectorHint}>{selectorDescription}</Text>
            </View>

            <View style={styles.selectorAction}>
              <ArrowDownIcon width={20} height={20} />
            </View>
          </TouchableOpacity>

          <Text style={styles.selectorFootnote}>
            {t('auth.language_footnote')}
          </Text>

          <ButtonGoogle />
        </View>
      </View>

      <ModalInterfaceLanguage sheetRef={sheetRef} onDismiss={dismissSheet} />
    </Layout>
  )
}

export default AuthScreen
