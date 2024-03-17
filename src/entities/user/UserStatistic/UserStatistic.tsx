import React, { FC, memo } from 'react'
import { View } from 'react-native'
import { styles } from './UserStatistic.styles'
import Text from '@/shared/UI/Text/Text'

/**
 * информация о пользователе
 *
 * @format
 */

type Props = {}

const UserStatistic: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.statistic}>Статистика:</Text>

      <View style={styles.item}>
        <Text style={styles.itemText}>Всего слов/правил/предложений: 0</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.itemText}>Изучено: 0</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.itemText}>В процессе: 0</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.itemText}>Изучаемые языки: English</Text>
      </View>
    </View>
  )
}

export default memo(UserStatistic)
