import React, { FC } from 'react'
import { View } from 'react-native'

import Text from '@/shared/UI/Text/Text'

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

type Props = {
  activeScreen?: RouteName
  tabName: TabsKeys
}

const TabsHero: FC<Props> = ({ activeScreen, tabName }) => {
  const hero = HERO_BY_TAB[tabName]
  const isHidden = activeScreen
    ? TABS_HERO_HIDDEN_ROUTES.includes(activeScreen)
    : false

  if (!hero || isHidden) {
    return <></>
  }

  return (
    <View style={styles.hero}>
      <View style={styles.heroCopy}>
        <Text style={styles.heroKicker}>{hero.kicker}</Text>
        <Text style={styles.heroTitle}>{hero.title}</Text>
      </View>

      <View style={styles.heroPlaceholder}>
        <Text style={styles.heroPlaceholderText}>USER</Text>
      </View>
    </View>
  )
}

export default TabsHero
