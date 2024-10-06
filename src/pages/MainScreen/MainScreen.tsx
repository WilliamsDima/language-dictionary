import Layout from '@/shared/UI/Layout/Layout'
import React, { FC } from 'react'
import { View } from 'react-native'
import { styles } from './MainScreen.styles'
import ButtonAdd from './UI/ButtonAdd/ButtonAdd'
import SearchWords from './UI/SearchWords/SearchWords'
import ModalAddItem from '@/features/ModalAddItem/ModalAddItem'
import MainList from '@/widgets/MainList/UI/MainList/MainList'

const MainScreen: FC = () => {
  return (
    <Layout dismissKeyboard>
      <View style={styles.screen}>
        <SearchWords />

        <MainList />

        <ButtonAdd />
      </View>

      <ModalAddItem />
    </Layout>
  )
}

export default MainScreen
