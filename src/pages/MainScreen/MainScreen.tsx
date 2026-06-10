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

const MainScreen: FC = () => {
  return (
    <Layout dismissKeyboard>
      <View style={styles.screen}>
        <View style={styles.topSection}>
          <View style={styles.hero}>
            <View style={styles.heroTextBlock}>
              <Text style={styles.kicker}>Ежедневная серия</Text>
              <Text style={styles.title}>Твоя личная колода слов</Text>
              <Text style={styles.subtitle}>
                Добавляй карточки, прокачивай повторение и держи темп каждый
                день.
              </Text>
            </View>

            <View style={styles.heroPlaceholder}>
              {/* PLACEHOLDER: здесь хочется видеть маскота/иллюстрацию в духе Duo с эмоцией "готов к практике" */}
              <Text style={styles.heroPlaceholderText}>MASCOT</Text>
            </View>
          </View>

          <View style={styles.controls}>
            <SearchWords />
            <MainFilter />
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
    </Layout>
  )
}

export default MainScreen
