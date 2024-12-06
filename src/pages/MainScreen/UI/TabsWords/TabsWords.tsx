import React, { FC } from 'react'
import { styles } from './TabsWords.styles'
import { View } from 'react-native'
import Button from '@/shared/UI/Button/Button'
import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import { tabsWords } from '@/shared/helpers/tabsWord'

type Props = {}

const TabsWords: FC<Props> = (props) => {
  const { setFilterByStatus } = useActions()
  const { filterByStatus } = useAppSelector((store) => store.items)

  return (
    <View style={styles.container}>
      {tabsWords.map((it) => {
        return (
          <Button
            key={it.status}
            isText={false}
            onPress={() => {
              setFilterByStatus(it.status)
            }}
            classes={{
              btn: [
                styles.btn,
                filterByStatus === it.status && styles.btnActive,
              ],
            }}
          >
            <View style={[styles.circle, { backgroundColor: it.color }]} />
            <Text numberOfLines={1} style={styles.label}>
              {it.label}
            </Text>
          </Button>
        )
      })}
    </View>
  )
}

export default TabsWords
