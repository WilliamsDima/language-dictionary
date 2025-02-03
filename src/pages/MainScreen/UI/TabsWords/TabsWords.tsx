import React, { FC } from 'react'
import { styles } from './TabsWords.styles'
import { View } from 'react-native'
import Button from '@/shared/UI/Button/Button'
import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import { tabsWords } from '@/shared/helpers/tabsWord'
import { useCards } from '@/shared/hooks/useCards'
import { useLazyGetItemsQuery } from '../../api/cardsServices'
import { StatusItem } from '@/entities/Item/model/item'

type Props = {}

const TabsWords: FC<Props> = (props) => {
  const { setFilterByStatus } = useActions()
  const { firebaseData } = useAppSelector((store) => store.user)
  const { filterByStatus, filterMain } = useAppSelector((store) => store.items)

  const { page, setAllItems, setLastVisible, setIsLoading } = useCards()

  const [getItems] = useLazyGetItemsQuery()

  const onPresHandler = (status: StatusItem) => {
    if (firebaseData) {
      setFilterByStatus(status)
      setIsLoading(true)
      getItems({
        uid: firebaseData?.uid,
        filter: {
          status,
          search: '',
          filter: {
            sortDate: filterMain?.sortDate,
            languages: filterMain?.languages,
          },
        },
        limitCount: 10,
        page: 1,
      })
        .then((res) => {
          if (res?.data?.items) {
            setAllItems(res.data?.items)
            setLastVisible(res.data?.lastVisible)
          }
        })
        .finally(() => {
          setIsLoading(false)
          page.current = page.current + 1
        })
    }
  }

  return (
    <View style={styles.container}>
      {tabsWords.map((it) => {
        return (
          <Button
            key={it.status}
            isText={false}
            onPress={() => {
              onPresHandler(it.status)
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
