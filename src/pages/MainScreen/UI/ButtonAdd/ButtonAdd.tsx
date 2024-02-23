import React, { FC } from 'react'
import { styles } from './ButtonAdd.styles'
import { TouchableOpacity } from 'react-native'
import PlusIcon from '@/assets/icons/UI/plus.svg'

interface Props {}

const ButtonAdd: FC<Props> = (props) => {
  const onAdd = () => {}

  return (
    <TouchableOpacity style={styles.btn} onPress={onAdd}>
      <PlusIcon />
    </TouchableOpacity>
  )
}

export default ButtonAdd
