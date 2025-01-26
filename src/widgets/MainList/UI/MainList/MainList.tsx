import React, { FC, useEffect, useMemo, useState } from 'react'
import { FlatList, View } from 'react-native'
import { styles } from './MainList.styles'
import { useAppSelector } from '@/shared/hooks/useStore'
import LottieView from 'lottie-react-native'
import Text from '@/shared/UI/Text/Text'
import MainItem from '@/entities/Item/UI/MainItem/MainItem'
import Loader from '@/shared/UI/Loader/Loader'
import ModalDeleteItem from '@/features/ModalDeleteItem/ModalDeleteItem'
import { useCallbackDebounce } from '@/shared/hooks/useDebounce'
import { useGetItemsQuery } from '@/pages/MainScreen/api/cardsServices'
import { IItem } from '@/entities/Item/model/item'

const MainList: FC = () => {
  const { firebaseData } = useAppSelector((store) => store.user)
  const { filterByStatus, search, filterMain, items } = useAppSelector(
    (store) => store.items
  )
  const [page, setPage] = useState(1) // состояние для отслеживания страницы
  const [allItems, setAllItems] = useState<IItem[]>([]) // для хранения всех элементов

  const counts = useMemo(() => {
    return {
      ALL: items.length,
      READY: items.filter((it) => it.status === 'READY').length,
      STUDY: items.filter((it) => it.status === 'STUDY').length,
    }
  }, [items])

  // Локальное состояние для дебаунсированного поиска
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  // Используем дебаунс для поиска
  const debouncedSearchHandler = useCallbackDebounce((value: string) => {
    setDebouncedSearch(value)
  }, 500)

  const isFilterActive = useMemo(() => {
    return !!filterByStatus || !!debouncedSearch
  }, [filterByStatus, debouncedSearch])

  // Обновляем значение дебаунса при изменении search
  useEffect(() => {
    debouncedSearchHandler(search)
  }, [search, debouncedSearchHandler])

  const { data, isLoading, isFetching } = useGetItemsQuery(
    {
      uid: firebaseData?.uid,
      filter: {
        status: filterByStatus,
        search: debouncedSearch,
        filter: {
          sortDate: filterMain?.sortDate,
          languages: filterMain?.languages,
        },
      },
      limitCount: 10,
      page,
    },
    { skip: !firebaseData?.uid }
  )

  console.log('data', data)

  // Функция для загрузки данных с пагинацией
  // Обрабатываем загрузку новых элементов при достижении конца списка
  const loadMoreItems = () => {
    if (isFetching || !data || data.items.length < counts[filterByStatus])
      return // если данные уже загружаются или нет новых данных, не запрашиваем

    setAllItems((prevItems) => [...prevItems, ...data.items]) // добавляем новые элементы к уже загруженным
    setPage((prevPage) => prevPage + 1) // увеличиваем номер страницы
  }

  return (
    <View style={styles.listWrapper}>
      {isLoading ? (
        <View style={[styles.loader]}>
          <Loader lottieStyles={styles.animLoader} />
        </View>
      ) : allItems?.length ? (
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
