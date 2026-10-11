import React, { FC, memo, useMemo } from 'react'
import { View } from 'react-native'
import { styles } from './SimilarItemsHint.styles'
import Text from '@/shared/UI/Text/Text'
import { IItem } from '@/entities/Item/model/item'
import { useTranslation } from '@/shared/i18n/types'
import { SimilarHint } from '../../Model/items'
import SimilarItemsHintItem from '../SimilarItemsHintItem/SimilarItemsHintItem'

type Props = {
  hint: SimilarHint
  onSelect: (item: IItem) => void
}

/**
 * ненавязчивая подсказка о похожих уже существующих карточках
 *
 * @format
 */

const SimilarItemsHint: FC<Props> = ({ hint, onSelect }) => {
  const { t } = useTranslation()

  const hasRest = useMemo(() => hint.restCount > 0, [hint.restCount])

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{t('modal.modalAddItem.similar_exists')}</Text>

      <View style={styles.list}>
        {hint.items.map((similar) => (
          <SimilarItemsHintItem
            key={similar.item.id}
            similar={similar}
            onSelect={onSelect}
          />
        ))}

        {hasRest ? (
          <Text style={styles.rest}>
            {t('modal.modalAddItem.similar_more', { count: hint.restCount })}
          </Text>
        ) : (
          <></>
        )}
      </View>
    </View>
  )
}

export default memo(SimilarItemsHint)
