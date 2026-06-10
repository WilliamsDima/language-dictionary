import Layout from '@/shared/UI/Layout/Layout'
import { useAppSelector } from '@/shared/hooks/useStore'
import React, { FC, useMemo, useRef } from 'react'
import { Animated, View } from 'react-native'
import { styles } from './SettingsScreen.styles'
import VersionBlock from './UI/VersionBlock/VersionBlock'
import AboutBlock from './UI/AboutBlock/AboutBlock'
import DeveloperInfo from './UI/DeveloperInfo/DeveloperInfo'
import Button from '@/shared/UI/Button/Button'
import openInBrowser from '@/shared/helpers/openInBrowser'
import Settings from './UI/Settings/Settings'
import { useTranslation } from '@/shared/i18n/types'
import Text from '@/shared/UI/Text/Text'

const SettingsScreen: FC = () => {
  const { t } = useTranslation()
  const scrollY = useRef(new Animated.Value(0)).current

  const { aplication } = useAppSelector((store) => store.app)

  const heroAnimatedStyle = useMemo(() => {
    const translateY = scrollY.interpolate({
      inputRange: [0, 80],
      outputRange: [0, -52],
      extrapolate: 'clamp',
    })

    const scale = scrollY.interpolate({
      inputRange: [0, 80],
      outputRange: [1, 0.94],
      extrapolate: 'clamp',
    })

    const opacity = scrollY.interpolate({
      inputRange: [0, 64],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    })

    return {
      transform: [{ translateY }, { scale }],
      opacity,
    }
  }, [scrollY])

  const toPrivacyPolicy = () => {
    openInBrowser(aplication?.privacy_policy_link || '')
  }

  return (
    <Layout
      isScroll
      scrollViewProps={{
        onScroll: Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        ),
        scrollEventThrottle: 16,
      }}
    >
      <View style={styles.screen}>
        <Animated.View style={[styles.hero, heroAnimatedStyle]}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroKicker}>Тонкая настройка</Text>
            <Text style={styles.heroTitle}>
              Сделай обучение удобным под себя
            </Text>
          </View>
          <View style={styles.heroPlaceholder}>
            {/* PLACEHOLDER: здесь хочется видеть аккуратную settings-иллюстрацию или стек переключателей */}
            <Text style={styles.heroPlaceholderText}>SETUP</Text>
          </View>
        </Animated.View>

        <Settings />
        <AboutBlock />
        <DeveloperInfo />
        <VersionBlock />

        <Button
          type="BORDER-TRANSPARENT"
          classes={{
            btn: styles.privacyPolicy,
            textBtn: styles.privacyPolicyText,
          }}
          onPress={toPrivacyPolicy}
        >
          {t('settingsScreen.privacy_policy')}
        </Button>
      </View>
    </Layout>
  )
}

export default SettingsScreen
