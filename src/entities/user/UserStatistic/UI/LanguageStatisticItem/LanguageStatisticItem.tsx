import React, { FC, memo } from 'react'
import { View } from 'react-native'
import { styles } from './LanguageStatisticItem.styles'
import Text from '@/shared/UI/Text/Text'
import { ILanguage } from '@/shared/API/services/languages/types'

type Props = {
  item: ILanguage
}

const LanguageStatisticItem: FC<Props> = ({ item }) => {
  return (
    <View style={styles.itemLang}>
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.languagesText}>{item.name}</Text>
    </View>
  )
}

export default memo(LanguageStatisticItem)
