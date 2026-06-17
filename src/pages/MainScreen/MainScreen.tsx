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
import Text from '@/shared/UI/Text/Text'
import { useBottomSheet } from '@/shared/UI/BottomSheet/hooks/useBottomSheet'
import MainFilterModal from './UI/MainFilterModal/MainFilterModal'

const MainScreen: FC = () => {
  const [sheetFilterRef, presentSheetFilter, dismissSheetFilter] =
    useBottomSheet()

  return (
    <Layout dismissKeyboard>
      <View style={styles.screen}>
        <View style={styles.topSection}>
          <View style={styles.controls}>
            <SearchWords />
            <MainFilter onPress={presentSheetFilter} />
          </View>

          <View style={styles.tabsWrapper}>
            <TabsWords />
          </View>
        </View>

        <View style={styles.listSection}>
          <MainList />
        </View>

        <ButtonAdd />
      </View>

      <ModalAddItem />
      <MainFilterModal sheetRef={sheetFilterRef} onClose={dismissSheetFilter} />
    </Layout>
  )
}

export default MainScreen
