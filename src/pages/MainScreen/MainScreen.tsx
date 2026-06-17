import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Animated,
  FlatList,
  type ListRenderItem,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
  View,
  useWindowDimensions,
} from 'react-native'
import { styles } from './MainScreen.styles'
import ButtonAdd from './UI/ButtonAdd/ButtonAdd'
import SearchWords from './UI/SearchWords/SearchWords'
import ModalAddItem from '@/features/ModalAddItem/ModalAddItem'
import ModalDeleteItem from '@/features/ModalDeleteItem/ModalDeleteItem'
import TabsWords from './UI/TabsWords/TabsWords'
import MainFilter from './UI/MainFilter/MainFilter'
import { useBottomSheet } from '@/shared/UI/BottomSheet/hooks/useBottomSheet'
import MainFilterModal from './UI/MainFilterModal/MainFilterModal'
import { useActions } from '@/shared/hooks/useActions'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useTranslation } from '@/shared/i18n/types'
import { useUnistyles } from 'react-native-unistyles'
import { tabsWords, type TabWord } from '@/shared/helpers/tabsWord'
import type { StatusItem } from '@/entities/Item/model/item'
import MainStatusSlide from './UI/MainStatusSlide/MainStatusSlide'

const MainScreen: FC = () => {
  const { setFilterByStatus } = useActions()
  const { filterByStatus } = useAppSelector((store) => store.items)
  const [sheetFilterRef, presentSheetFilter, dismissSheetFilter] =
    useBottomSheet()
  const { width } = useWindowDimensions()
  const { t } = useTranslation()
  const { theme } = useUnistyles()
  const sliderWidth = width - theme.layout.appPadding * 2

  const tabs = useMemo(() => tabsWords(t, theme), [t, theme])
  const sliderRef = useRef<FlatList<TabWord>>(null)
  const scrollX = useRef(new Animated.Value(0)).current
  const currentStatusRef = useRef(filterByStatus)
  const activeIndex = useMemo(() => {
    return Math.max(
      tabs.findIndex((tab) => tab.status === filterByStatus),
      0
    )
  }, [filterByStatus, tabs])

  const changeStatus = (status: StatusItem) => {
    if (status !== filterByStatus) {
      const nextIndex = tabs.findIndex((tab) => tab.status === status)

      currentStatusRef.current = status
      setFilterByStatus(status)

      if (nextIndex >= 0) {
        sliderRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        })
      }
    }
  }

  useEffect(() => {
    currentStatusRef.current = filterByStatus
  }, [filterByStatus])

  const renderSlide = useCallback<ListRenderItem<(typeof tabs)[number]>>(
    ({ item }) => {
      return (
        <View style={[styles.slide, { width: sliderWidth }]}>
          <MainStatusSlide status={item.status} />
        </View>
      )
    },
    [sliderWidth]
  )

  const getItemLayout = useCallback(
    (_: ArrayLike<TabWord> | null | undefined, index: number) => {
      return {
        length: sliderWidth,
        offset: sliderWidth * index,
        index,
      }
    },
    [sliderWidth]
  )

  const onMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextIndex = Math.round(
        event.nativeEvent.contentOffset.x / sliderWidth
      )
      const nextTab = tabs[nextIndex]

      if (nextTab && nextTab.status !== filterByStatus) {
        setFilterByStatus(nextTab.status)
      }
    },
    [filterByStatus, setFilterByStatus, sliderWidth, tabs]
  )

  const onScroll = useMemo(() => {
    return Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
      {
        useNativeDriver: false,
        listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
          const nextIndex = Math.round(
            event.nativeEvent.contentOffset.x / sliderWidth
          )
          const nextTab = tabs[nextIndex]

          if (nextTab && nextTab.status !== currentStatusRef.current) {
            currentStatusRef.current = nextTab.status
            setFilterByStatus(nextTab.status)
          }
        },
      }
    )
  }, [scrollX, setFilterByStatus, sliderWidth, tabs])

  return (
    <Layout dismissKeyboard>
      <View style={styles.screen}>
        <View style={styles.topSection}>
          <View style={styles.controls}>
            <SearchWords />
            <MainFilter onPress={presentSheetFilter} />
          </View>

          <View style={styles.tabsWrapper}>
            <TabsWords
              activeStatus={filterByStatus}
              onChange={changeStatus}
              scrollX={scrollX}
              sliderWidth={sliderWidth}
            />
          </View>
        </View>

        <Animated.FlatList
          ref={sliderRef}
          data={tabs}
          keyExtractor={(item) => item.status}
          renderItem={renderSlide}
          getItemLayout={getItemLayout}
          horizontal
          pagingEnabled
          style={styles.listSection}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />

        <ButtonAdd />
      </View>

      <ModalAddItem />
      <ModalDeleteItem />
      <MainFilterModal sheetRef={sheetFilterRef} onClose={dismissSheetFilter} />
    </Layout>
  )
}

export default MainScreen
