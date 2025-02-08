import React, { FC } from 'react'
import { FlatList, View } from 'react-native'
import { styles } from './MainList.styles'
import LottieView from 'lottie-react-native'
import Text from '@/shared/UI/Text/Text'
import MainItem from '@/entities/Item/UI/MainItem/MainItem'
import Loader from '@/shared/UI/Loader/Loader'
import ModalDeleteItem from '@/features/ModalDeleteItem/ModalDeleteItem'
import { useCardsContext } from '@/shared/hooks/useCardsContext'
import { useAppSelector } from '@/shared/hooks/useStore'

const MainList: FC = () => {
  const { filterByStatus } = useAppSelector((store) => store.items)

  const { allItems, counts, isLoading, isFilterActive, loadMoreItems } =
    useCardsContext()

  return (
    <View style={styles.listWrapper}>
      {isLoading && (
        <View style={[styles.loader]}>
          <Loader lottieStyles={styles.animLoader} />
        </View>
      )}

      {allItems?.length ? (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={allItems}
          ListHeaderComponent={
            <Text style={styles.count}>
              Всего найдено: {counts[filterByStatus]}
            </Text>
          }
          showsVerticalScrollIndicator={false}
          style={styles.list}
          contentContainerStyle={styles.columnWrapperStyle}
          onEndReached={loadMoreItems} // вызываем загрузку при достижении конца списка
          onEndReachedThreshold={0.5} // порог срабатывания (когда осталось 50% данных)
          renderItem={({ item }) => {
            return <MainItem item={item} />
          }}
        />
      ) : (
        <View style={styles.empty}>
          <LottieView
            source={require('../../model/empty-list-lottie.json')}
            style={styles.anim}
            autoPlay
            loop
          />

          <Text style={styles.emptyText}>
            {isFilterActive
              ? 'Ничего не найдено'
              : 'Добавьте слова для изучения'}
          </Text>
        </View>
      )}

      <ModalDeleteItem />
    </View>
  )
}

export default MainList
