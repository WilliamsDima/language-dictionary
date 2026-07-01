import React, { FC, useMemo, useRef, useState } from 'react'
import { FlatList, View, Animated, TouchableOpacity } from 'react-native'
import { styles } from './MainList.styles'
import LottieView from 'lottie-react-native'
import Text from '@/shared/UI/Text/Text'
import MainItem from '@/entities/Item/UI/MainItem/MainItem'
import Loader from '@/shared/UI/Loader/Loader'
import Button from '@/shared/UI/Button/Button'
import { useTranslation } from '@/shared/i18n/types'
import type { IItem } from '@/entities/Item/model/item'
import type { MainButtonSideValue } from '@/shared/store/slice/userSlice'
import { Icon } from '@/assets/icons/Icon'
import { useUnistyles } from 'react-native-unistyles'

type Props = {
  count: number
  isFilterActive: boolean
  isLoading: boolean
  items: IItem[] | null
  loadMoreItems: () => void
  side?: MainButtonSideValue
}

const MainList: FC<Props> = ({
  count,
  isFilterActive,
  isLoading,
  items,
  loadMoreItems,
  side = 'right',
}) => {
  const { t } = useTranslation()
  const { theme } = useUnistyles()

  const [showScrollTop, setShowScrollTop] = useState(false)
  const flatListRef = useRef<FlatList>(null)
  const scrollY = useRef(new Animated.Value(0)).current

  const scrollToTopBtnStyle = useMemo(() => {
    return side === 'left'
      ? styles.scrollToTopBtnLeft
      : styles.scrollToTopBtnRight
  }, [side])

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

      {!!items && !!items.length ? (
        <>
          <FlatList
            ref={flatListRef}
            keyExtractor={(item) => item.id.toString()}
            data={items}
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
            <TouchableOpacity
              style={[styles.scrollToTopBtn, scrollToTopBtnStyle]}
              onPress={scrollToTop}
            >
              <Icon
                kind="svg"
                name="up-circle"
                width={42}
                height={42}
                color={theme.colors.icon.primary}
              />
            </TouchableOpacity>
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
