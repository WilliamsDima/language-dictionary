import React, { FC, useEffect, useMemo, useState } from 'react'
import { FlatList, View } from 'react-native'
import { styles } from './MainList.styles'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useGetItemsQuery } from '@/pages/SettingsScreen/api/userServices'
import LottieView from 'lottie-react-native'
import Text from '@/shared/UI/Text/Text'
import MainItem from '@/entities/Item/UI/MainItem/MainItem'
import Loader from '@/shared/UI/Loader/Loader'
import ModalDeleteItem from '@/features/ModalDeleteItem/ModalDeleteItem'
import { useCallbackDebounce } from '@/shared/hooks/useDebounce'

const MainList: FC = () => {
  const { user } = useAppSelector((store) => store.user)
  const { filterByStatus, search } = useAppSelector((store) => store.items)

  // Локальное состояние для дебаунсированного поиска
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  // Используем дебаунс для поиска
  const debouncedSearchHandler = useCallbackDebounce((value: string) => {
    setDebouncedSearch(value)
  }, 500)

  // Обновляем значение дебаунса при изменении search
  useEffect(() => {
    debouncedSearchHandler(search)
  }, [search, debouncedSearchHandler])

  const { data, isLoading } = useGetItemsQuery(
    {
      uid: user?.uid,
      filter: {
        status: filterByStatus,
        search: debouncedSearch,
      },
    },
    { skip: !user?.uid }
  )

  console.log('data', data)

  const isFilterActive = useMemo(() => {
    return !!filterByStatus || !!debouncedSearch
  }, [filterByStatus, debouncedSearch])

  return (
    <View style={styles.listWrapper}>
      {isLoading ? (
        <View style={[styles.loader]}>
          <Loader lottieStyles={styles.animLoader} />
        </View>
      ) : data?.length ? (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={data}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          contentContainerStyle={styles.columnWrapperStyle}
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
