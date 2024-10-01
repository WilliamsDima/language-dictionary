import React, { FC, memo } from 'react'
import { Image, View } from 'react-native'
import { styles } from './LanguageStatisticItem.styles'
import Text from '@/shared/UI/Text/Text'
import { ILanguage } from '@/shared/json/languages'

type Props = {
  item: ILanguage
}

const LanguageStatisticItem: FC<Props> = ({ item }) => {
  return (
    <View style={styles.itemLang}>
      <Image source={{ uri: item.country.flag }} style={styles.flag} />
      <Text style={[styles.languagesText]}>{item?.full_name}</Text>
    </View>
  )
}

export default memo(LanguageStatisticItem)
