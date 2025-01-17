import React, { FC } from 'react'
import { styles } from './ButtonAdd.styles'
import { TouchableOpacity } from 'react-native'
import PlusIcon from '@/assets/icons/UI/plus.svg'
import { useActions } from '@/shared/hooks/useActions'

interface Props {}

const ButtonAdd: FC<Props> = (props) => {
  const { setShowAddModal } = useActions()
  const onAdd = () => {
    setShowAddModal(true)
  }

  return (
    <TouchableOpacity style={styles.btn} onPress={onAdd}>
      <PlusIcon />
    </TouchableOpacity>
  )
}

export default ButtonAdd
