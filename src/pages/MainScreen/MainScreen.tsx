import Layout from '@/shared/UI/Layout/Layout'
import Text from '@/shared/UI/Text/Text'
import React, { FC } from 'react'
import { View } from 'react-native'
import { styles } from './MainScreen.styles'
import ButtonAdd from './UI/ButtonAdd/ButtonAdd'
import SearchWords from './UI/SearchWords/SearchWords'
import ModalAddItem from '@/features/ModalAddItem/ModalAddItem'
import { useGetItemsQuery } from '../SettingsScreen/api/userServices'
import { useAppSelector } from '@/shared/hooks/useStore'

const MainScreen: FC = () => {
  const { user } = useAppSelector((store) => store.user)

  const { data } = useGetItemsQuery(user?.uid)

  console.log('data', data)

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
