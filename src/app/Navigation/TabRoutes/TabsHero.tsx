import React, { FC } from 'react'
import { View } from 'react-native'

import Text from '@/shared/UI/Text/Text'

import { RoutesNames, TabsKeys } from '../RoutesNames'
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

type Props = {
  tabName: TabsKeys
}

const TabsHero: FC<Props> = ({ tabName }) => {
  const hero = HERO_BY_TAB[tabName]

  if (!hero) {
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
