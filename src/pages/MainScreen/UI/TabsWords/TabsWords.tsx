import React, { FC } from 'react'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './TabsWords.styles'
import { View } from 'react-native'
import Button from '@/shared/UI/Button/Button'
import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import { tabsWords } from '@/shared/helpers/tabsWord'
import { useCardsContext } from '@/shared/hooks/useCardsContext'
import { useLazyGetItemsQuery } from '../../api/cardsServices'
import type { IItem, StatusItem } from '@/entities/Item/model/item'
import { useTranslation } from '@/shared/i18n/types'

type Props = {}

type StatusTabProps = {
  active: boolean
  color: string
  label: string
  onPress: () => void
}

const StatusTab = ({ active, color, label, onPress }: StatusTabProps) => {
  styles.useVariants({
    active,
  })

  return (
    <Button
      isText={false}
      onPress={onPress}
      classes={{
        btn: styles.btn,
      }}
    >
      <View style={[styles.circle, { backgroundColor: color }]} />
      <Text numberOfLines={1} style={styles.label}>
        {label}
      </Text>
    </Button>
  )
}

const TabsWords: FC<Props> = (props) => {
  const { setFilterByStatus, setItems } = useActions()
  const { t } = useTranslation()
  const { theme } = useUnistyles()

  const { firebaseData } = useAppSelector((store) => store.user)
  const { filterByStatus, filterMain } = useAppSelector((store) => store.items)

  const { page, setAllItems, setLastVisible, setIsLoading } = useCardsContext()

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
            if (res.data?.items) {
              const obj: Record<number, IItem> = {}

              res.data?.items.forEach((it) => {
                obj[it.id] = it
              })

              setAllItems(obj)
              setItems(obj)
            }

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
      {tabsWords(t, theme).map((it) => {
        return (
          <StatusTab
            key={it.status}
            active={filterByStatus === it.status}
            color={it.color}
            label={it.label}
            onPress={() => {
              onPresHandler(it.status)
            }}
          />
        )
      })}
    </View>
  )
}

export default TabsWords
