import React, { FC, useState, useRef } from 'react'
import { FlatList, View, Animated } from 'react-native'
import { styles } from './MainList.styles'
import LottieView from 'lottie-react-native'
import Text from '@/shared/UI/Text/Text'
import MainItem from '@/entities/Item/UI/MainItem/MainItem'
import TopArrow from '@/assets/icons/UI/arrow-top-white-64.svg'
import Loader from '@/shared/UI/Loader/Loader'
import Button from '@/shared/UI/Button/Button'
import { useTranslation } from '@/shared/i18n/types'
import type { IItem } from '@/entities/Item/model/item'

type Props = {
  count: number
  isFilterActive: boolean
  isLoading: boolean
  items: Record<number, IItem> | null
  loadMoreItems: () => void
}

const MainList: FC<Props> = ({
  count,
  isFilterActive,
  isLoading,
  items,
  loadMoreItems,
}) => {
  const { t } = useTranslation()

  const [showScrollTop, setShowScrollTop] = useState(false)
  const flatListRef = useRef<FlatList>(null)
  const scrollY = useRef(new Animated.Value(0)).current
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
      {isLoading ? (
        <View style={styles.loader}>
          <Loader lottieStyles={styles.animLoader} />
        </View>
      ) : (
        <></>
      )}

      <Text style={styles.count}>
        {t('main.list_count')} {count}
      </Text>

      {!!items && !!Object.keys(items)?.length ? (
        <>
          <FlatList
            ref={flatListRef}
            keyExtractor={(item) => item.id.toString()}
            data={Object.values(items)}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            contentContainerStyle={styles.columnWrapperStyle}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => <MainItem item={item} />}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            keyboardShouldPersistTaps="handled"
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
        <View style={styles.emptyWrapper}>
          <View style={styles.empty}>
            <LottieView
              source={require('../../model/empty-list-lottie.json')}
              style={styles.anim}
              autoPlay
              loop
            />
            <Text style={styles.emptyText}>
              {isFilterActive
                ? t('main.filter_not_found')
                : t('main.added_words')}
            </Text>
          </View>
        </View>
      )}
    </View>
  )
}

export default MainList
