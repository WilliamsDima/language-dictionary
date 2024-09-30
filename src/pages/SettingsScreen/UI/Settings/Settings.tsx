import { useAppSelector } from '@/shared/hooks/useStore'
import React, { FC } from 'react'
import { View } from 'react-native'
import { styles } from './Settings.styles'
import Select from '@/shared/UI/Select/Select'

const Settings: FC = () => {
  const { aplication } = useAppSelector((store) => store.app)

  return (
    <View style={styles.container}>
      <Select title="Вариант показа" options={aplication?.showVariantsList} />
    </View>
  )
}

export default Settings
