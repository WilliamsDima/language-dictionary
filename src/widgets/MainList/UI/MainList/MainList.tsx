import React, { FC, useState, useRef } from 'react'
import { FlatList, View, Animated } from 'react-native'
import { styles } from './MainList.styles'
import LottieView from 'lottie-react-native'
import Text from '@/shared/UI/Text/Text'
import MainItem from '@/entities/Item/UI/MainItem/MainItem'
import TopArrow from '@/assets/icons/UI/arrow-top-white-64.svg'
import Loader from '@/shared/UI/Loader/Loader'
import ModalDeleteItem from '@/features/ModalDeleteItem/ModalDeleteItem'
import { useCardsContext } from '@/shared/hooks/useCardsContext'
import { useAppSelector } from '@/shared/hooks/useStore'
import Button from '@/shared/UI/Button/Button'

const MainList: FC = () => {
  const { filterByStatus } = useAppSelector((store) => store.items)
  const { allItems, counts, isLoading, isFilterActive, loadMoreItems } =
    useCardsContext()

  const [showScrollTop, setShowScrollTop] = useState(false)
  const flatListRef = useRef<FlatList>(null)
  const scrollY = useRef(new Animated.Value(0)).current

  // Обработчик скролла
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        // @ts-ignore
        const offsetY = event?.nativeEvent?.contentOffset.y
        setShowScrollTop(offsetY > 100) // Показываем кнопку после 100px
      },
    }
  )

  // Функция для прокрутки вверх
  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 })
  }

  return (
    <View style={styles.listWrapper}>
      {isLoading && (
        <View style={styles.loader}>
          <Loader lottieStyles={styles.animLoader} />
        </View>
      )}

      {allItems?.length ? (
        <>
          <FlatList
            ref={flatListRef}
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
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => <MainItem item={item} />}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />

          {/* Кнопка наверх */}
          {showScrollTop && (
            <Button
              classes={{
                btn: styles.scrollToTopBtn,
              }}
              onPress={scrollToTop}
              isText={false}
            >
              <TopArrow width={32} height={32} />
            </Button>
          )}
        </>
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
