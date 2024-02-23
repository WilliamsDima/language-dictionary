import Layout from '@/shared/UI/Layout/Layout'
import Text from '@/shared/UI/Text/Text'
import React, { FC } from 'react'
import { View } from 'react-native'
import { styles } from './MainScreen.styles'
import ButtonAdd from './UI/ButtonAdd/ButtonAdd'
import SearchWords from './UI/SearchWords/SearchWords'

const MainScreen: FC = () => {
  return (
    <Layout dismissKeyboard>
      <View style={styles.screen}>
        <SearchWords />
        <Text>MainScreen</Text>

        <ButtonAdd />
      </View>
    </Layout>
  )
}

export default MainScreen
