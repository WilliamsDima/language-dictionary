import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import { styles } from './ItemTooltip.styles'
import Text from '@/shared/UI/Text/Text'
import DoneIcon from '@/assets/icons/UI/done-primery-64.svg'
import DeleteIcon from '@/assets/icons/UI/trash-red-64.svg'
import ErrorIcon from '@/assets/icons/UI/error-circle-red-64.svg'

type Props = {
  type: 'UPDATE' | 'DELETE' | 'ADD' | 'ERROR'
  text?: string
}

const ItemTooltip: FC<Props> = ({ type, text }) => {
  const textHadler = useMemo(() => {
    switch (type) {
      case 'ADD':
        return text || 'Карточка добавлена!'

      case 'UPDATE':
        return text || 'Карточка обновлена!'

      case 'DELETE':
        return text || 'Карточка удалена!'

      case 'ERROR':
        return text || 'Что-то пошло не так...'

      default:
        return 'error text'
    }
  }, [type, text])

  const icon = useMemo(() => {
    switch (type) {
      case 'ADD':
        return <DoneIcon width={30} height={30} />

      case 'UPDATE':
        return <DoneIcon width={30} height={30} />

      case 'DELETE':
        return <DeleteIcon width={30} height={30} />

      case 'ERROR':
        return <ErrorIcon width={30} height={30} />

      default:
        return <ErrorIcon width={30} height={30} />
    }
  }, [type])

  return (
    <View style={styles.container}>
      <View style={styles.tooltip}>
        <Text style={styles.text}>{textHadler}</Text>
        {icon}
      </View>
    </View>
  )
}

export default ItemTooltip
