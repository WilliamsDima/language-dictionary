import React, { FC, useMemo } from 'react'
import { View, Image } from 'react-native'

import Text from '@/shared/UI/Text/Text'
import { useMeProfile } from '@/shared/hooks/useMeProfile'

import { RouteName, RoutesNames, TabsKeys } from '../RoutesNames'
import { styles } from './TabsHero.styles'

type HeroConfig = {
  kicker: string
  title: string
}

const HERO_BY_TAB: Partial<Record<TabsKeys, HeroConfig>> = {
  [RoutesNames.settingsStack]: {
    kicker: 'Тонкая настройка',
    title: 'Сделай обучение удобным под себя',
  },
  [RoutesNames.profileStack]: {
    kicker: 'Профиль ученика',
    title: 'Твой темп и прогресс',
  },
}

const TABS_HERO_HIDDEN_ROUTES: RouteName[] = [RoutesNames.cardsRepetition]

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

  const { data: profile } = useMeProfile()

  const initials = useMemo(
    () => (profile?.name ? getInitials(profile.name) : ''),
    [profile?.name],
  )

  if (!hero || isHidden) {
    return <></>
  }

  return (
    <View style={styles.hero}>
      <View style={styles.heroCopy}>
        <Text style={styles.heroKicker}>{profile?.name ?? hero.kicker}</Text>
        <Text style={styles.heroTitle}>{hero.title}</Text>
      </View>

      <View style={styles.heroPlaceholder}>
        {profile?.image ? (
          <Image style={styles.heroAvatar} source={{ uri: profile.image }} />
        ) : (
          <Text style={styles.heroPlaceholderText}>{initials}</Text>
        )}
      </View>
    </View>
  )
}

export default TabsHero
