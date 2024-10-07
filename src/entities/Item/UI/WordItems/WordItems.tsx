import React, { FC, memo, useMemo } from 'react'
import { View } from 'react-native'
import { styles } from './WordItems.styles'
import { IItem } from '../../model/item'
import { useGetUserProfileQuery } from '@/pages/SettingsScreen/api/userServices'
import { useAppSelector } from '@/shared/hooks/useStore'
import WordItem from '../WordItem/WordItem'

type Props = {
  item: IItem
  translateActive: boolean
}

const WordItems: FC<Props> = ({ item, translateActive }) => {
  const { user } = useAppSelector((store) => store.user)
  const { data: profile } = useGetUserProfileQuery(user?.uid)

  const viewTypeItem = useMemo(() => {
    return profile?.showVariantList
  }, [profile])

  const items = useMemo(() => {
    return translateActive ? item.items : item.items.slice(0, 1)
  }, [item, translateActive])

  return (
    <View style={styles.items}>
      {items.map((it, i) => {
        return (
          <WordItem
            key={it.id}
            item={it}
            index={i}
            isLast={i === items.length - 1}
            translateActive={translateActive}
          />
        )
      })}
    </View>
  )
}

export default memo(WordItems)
