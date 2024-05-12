import Layout from '@/shared/UI/Layout/Layout'
import Text from '@/shared/UI/Text/Text'
import React, { FC } from 'react'
import { View } from 'react-native'
import { styles } from './MainScreen.styles'
import ButtonAdd from './UI/ButtonAdd/ButtonAdd'
import SearchWords from './UI/SearchWords/SearchWords'
import { useAppSelector } from '@/shared/hooks/useStore'
import ModalAddItem from '@/features/ModalAddItem/ModalAddItem'

const MainScreen: FC = () => {
  const { user } = useAppSelector((store) => store.user)
  console.log('user', user)

  return (
    <Layout dismissKeyboard>
      <View style={styles.screen}>
        <SearchWords />
        <Text>MainScreen</Text>

        <ButtonAdd />
      </View>

      <ModalAddItem />
    </Layout>
  )
}

export default MainScreen
