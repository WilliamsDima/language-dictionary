import React, { FC, memo, useCallback, useMemo } from 'react'
import { TouchableOpacity } from 'react-native'
import { styles } from './SimilarItemsHintItem.styles'
import Text from '@/shared/UI/Text/Text'
import { IItem } from '@/entities/Item/model/item'
import { SimilarItem } from '../../Model/items'

type Props = {
  similar: SimilarItem
  onSelect: (item: IItem) => void
}

/**
 * найденная похожая карточка — тап открывает её на редактирование
 *
 * @format
 */

const SimilarItemsHintItem: FC<Props> = ({ similar, onSelect }) => {
  const label = useMemo(
    () => `${similar.word} — ${similar.translate}`,
    [similar.word, similar.translate]
  )

  const onPress = useCallback(() => {
    onSelect(similar.item)
  }, [onSelect, similar.item])

  return (
    <TouchableOpacity style={styles.chip} onPress={onPress}>
      <Text style={styles.text} numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default memo(SimilarItemsHintItem)
