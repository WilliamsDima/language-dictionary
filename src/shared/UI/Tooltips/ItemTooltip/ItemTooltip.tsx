import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import { styles } from './ItemTooltip.styles'
import Text from '@/shared/UI/Text/Text'
import DoneIcon from '@/assets/icons/UI/done-primery-64.svg'
import DeleteIcon from '@/assets/icons/UI/trash-red-64.svg'
import ErrorIcon from '@/assets/icons/UI/error-circle-red-64.svg'

type Props = {
  type: 'UPDATE' | 'DELETE' | 'ADD'
}

const ItemTooltip: FC<Props> = ({ type }) => {
  const text = useMemo(() => {
    switch (type) {
      case 'ADD':
        return 'Карточка добавлена!'

      case 'UPDATE':
        return 'Карточка обновлена!'

      case 'DELETE':
        return 'Карточка удалена!'

      default:
        return 'error text'
    }
  }, [type])

  const icon = useMemo(() => {
    switch (type) {
      case 'ADD':
        return <DoneIcon width={30} height={30} />

      case 'UPDATE':
        return <DoneIcon width={30} height={30} />

      case 'DELETE':
        return <DeleteIcon width={30} height={30} />

      default:
        return <ErrorIcon width={30} height={30} />
    }
  }, [type])

  return (
    <View style={styles.container}>
      <View style={styles.tooltip}>
        <Text style={styles.text}>{text}</Text>
        {icon}
      </View>
    </View>
  )
}

export default ItemTooltip
