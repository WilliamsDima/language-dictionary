import Layout from '@/shared/UI/Layout/Layout'
import React, { FC } from 'react'
import { View } from 'react-native'
import { styles } from './MainScreen.styles'
import ButtonAdd from './UI/ButtonAdd/ButtonAdd'
import SearchWords from './UI/SearchWords/SearchWords'
import ModalAddItem from '@/features/ModalAddItem/ModalAddItem'
import MainList from '@/widgets/MainList/UI/MainList/MainList'
import TabsWords from './UI/TabsWords/TabsWords'
import MainFilter from './UI/MainFilter/MainFilter'

const MainScreen: FC = () => {
  return (
    <Layout dismissKeyboard>
      <View style={styles.screen}>
        <View style={styles.top}>
          <SearchWords />
          <MainFilter />
        </View>

        <TabsWords />

        <MainList />

        <ButtonAdd />
      </View>

      <ModalAddItem />
    </Layout>
  )
}

export default MainScreen
