import React, { FC, memo, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import { type BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { styles } from './TabBar.styles'
import { TabsKeys } from '@/app/Navigation/RoutesNames'
import { Shadow } from 'react-native-shadow-2'
import ButtonTabBar from '../ButtonTabBar/ButtonTabBar'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useBottomSheet } from '@/shared/UI/BottomSheet/hooks/useBottomSheet'
import ModalCardsFilter from '@/features/ModalCardsFilter/ModalCardsFilter'
import PracticeButton from '../PracticeButton/PracticeButton'
import { useGetItemsQuery } from '@/pages/MainScreen/api/cardsServices'

const TabBar: FC<BottomTabBarProps> = (props) => {
  const { state, navigation } = props

  const { hiddenTabBar, isAuth } = useAppSelector((store) => store.app)
  const { data } = useGetItemsQuery(
    { filter: { status: 'ALL' }, limitCount: 1, page: 1 },
    { skip: !isAuth }
  )
  const { theme, rt } = useUnistyles()
  const [cardsSheetRef, presentCardsSheet, onDismissCardsSheet] =
    useBottomSheet()

  const colorShdow = useMemo(() => {
    return rt.themeName === 'dark'
      ? theme.colors.background.screen
      : theme.colors.base.white
  }, [rt.themeName, theme.colors.background.screen, theme.colors.base.white])

  const backgroundColor = useMemo(() => {
    return theme.colors.tabBar.background
  }, [theme.colors.tabBar.background])

  const tabStyle = useMemo(() => {
    return [
      styles.tab,
      {
        backgroundColor,
        paddingBottom: rt.insets.bottom,
      },
    ]
  }, [backgroundColor, rt.insets.bottom])

  const tabTitles = useMemo<Record<TabsKeys, string>>(() => {
    return {
      mainStack: 'Слова',
      settingsStack: 'Настройки',
      profileStack: 'Профиль',
    }
  }, [])

  const hasItems = useMemo(() => {
    return !!data?.total
  }, [data?.total])

  const onOpenPractice = useCallback(() => {
    presentCardsSheet()
  }, [presentCardsSheet])

  return !hiddenTabBar ? (
    <View style={styles.wrapper}>
      {hasItems ? (
        <View style={styles.practiceContainer}>
          <PracticeButton onPress={onOpenPractice} />
        </View>
      ) : (
        <></>
      )}

      <Shadow
        containerStyle={[
          styles.containerStyle,
          { backgroundColor: colorShdow },
        ]}
        style={tabStyle}
      >
        {state?.routes.map((route, index) => {
          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (
              !isFocused &&
              !(event as { defaultPrevented?: boolean }).defaultPrevented
            ) {
              navigation.navigate(route.name)
            }
          }

          return (
            <ButtonTabBar
              key={index}
              onPress={onPress}
              isFocused={isFocused}
              assetNames={tabTitles[route.name as TabsKeys]}
              routeName={route.name as TabsKeys}
            />
          )
        })}
      </Shadow>

      <ModalCardsFilter
        sheetRef={cardsSheetRef}
        onDismiss={onDismissCardsSheet}
      />
    </View>
  ) : (
    <></>
  )
}

export default memo(TabBar)
