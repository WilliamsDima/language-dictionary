import React, { FC, useEffect, useMemo } from 'react'
import { View } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { useUnistyles } from 'react-native-unistyles'

import Text from '@/shared/UI/Text/Text'
import { useMeProfile } from '@/shared/hooks/useMeProfile'
import { type I18NKeys, useTranslation } from '@/shared/i18n/types'

import { RouteName, RoutesNames, TabsKeys } from '../RoutesNames'
import { styles } from './TabsHero.styles'

type HeroConfig = {
  kicker: I18NKeys
  title: I18NKeys
}

const HERO_BY_TAB: Partial<Record<TabsKeys, HeroConfig>> = {
  [RoutesNames.practiceStack]: {
    kicker: 'tabsHero.practice.kicker',
    title: 'tabsHero.practice.title',
  },
  [RoutesNames.settingsStack]: {
    kicker: 'tabsHero.settings.kicker',
    title: 'tabsHero.settings.title',
  },
  [RoutesNames.profileStack]: {
    kicker: 'tabsHero.profile.kicker',
    title: 'tabsHero.profile.title',
  },
}

const TABS_HERO_HIDDEN_ROUTES: RouteName[] = [
  RoutesNames.cardsRepetition,
  RoutesNames.practiceSession,
]

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

type Props = {
  activeScreen?: RouteName
  tabName: TabsKeys
}

const TabsHero: FC<Props> = ({ activeScreen, tabName }) => {
  const hero = HERO_BY_TAB[tabName]
  const isHidden = activeScreen
    ? TABS_HERO_HIDDEN_ROUTES.includes(activeScreen)
    : false

  const { theme } = useUnistyles()
  const { data: profile } = useMeProfile()
  const { t } = useTranslation()

  const rotation = useSharedValue(0)
  const scale = useSharedValue(1)

  const initials = useMemo(
    () => (profile?.name ? getInitials(profile.name) : ''),
    [profile?.name]
  )

  const heroKicker = useMemo(
    () => profile?.name ?? (hero ? t(hero.kicker) : ''),
    [hero, profile?.name, t]
  )

  const heroTitle = useMemo(() => (hero ? t(hero.title) : ''), [hero, t])

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
  }))

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 6000, easing: Easing.linear }),
      -1,
      false
    )
    scale.value = withRepeat(
      withSequence(
        withTiming(1.5, { duration: 700, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 700, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    )
  }, [rotation, scale])

  if (!hero || isHidden) {
    return <></>
  }

  return (
    <View style={styles.hero}>
      <View style={styles.heroCopy}>
        <Text style={styles.heroKicker}>{heroKicker}</Text>
        <Text style={styles.heroTitle}>{heroTitle}</Text>
      </View>

      <View style={styles.heroPlaceholder}>
        <Animated.View style={[styles.heroGradientRotator, rotateStyle]}>
          <LinearGradient
            colors={[
              'transparent',
              theme.colors.palette.gradient_blue,
              theme.colors.palette.gradient_purple,
              theme.colors.palette.gradient_mint,
              'transparent',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          />
        </Animated.View>

        {profile?.image ? (
          <FastImage
            style={styles.heroAvatar}
            source={{ uri: profile.image }}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <Text style={styles.heroPlaceholderText}>{initials}</Text>
        )}
      </View>
    </View>
  )
}

export default TabsHero
