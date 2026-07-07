import React, { FC, memo, useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './MainItem.styles'
import Text from '@/shared/UI/Text/Text'
import { IItem } from '../../model/item'
import DeleteIcon from '@/assets/icons/UI/trash-red-64.svg'
import EditIcon from '@/assets/icons/UI/edit-green-64.svg'
import { useExpandAnim } from '@/shared/hooks/useExpandAnim'
import WordItems from '../WordItems/WordItems'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import { useCardsContext } from '@/shared/hooks/useCardsContext'
import { useTranslation } from '@/shared/i18n/types'
import { declOfNum } from '@/shared/helpers/textFormat'
import { dateFormat } from '@/shared/helpers/dateFormat'
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { Icon } from '@/assets/icons/Icon'
import type { ILanguage } from '@/shared/API/services/languages/types'

type Props = {
  item: IItem
  language?: ILanguage
}

const MainItem: FC<Props> = ({ item, language }) => {
  const { t } = useTranslation()
  const { theme } = useUnistyles()
  const { setModalDeleteItem, setItemEdit, setShowAddModal } = useActions()
  const { isAuth } = useAppSelector((store) => store.app)
  const { modalDeleteItem } = useAppSelector((store) => store.items)

  const { hidden: hiddenFooter, toggle: toggleFooter } = useExpandAnim()
  const { hidden: hiddenTranslate, toggle: toggleTranslate } = useExpandAnim()

  const [isLoading, setIsLoading] = useState(false)
  const pressScale = useSharedValue(1)

  styles.useVariants({
    isDeleteActive: item.id === modalDeleteItem?.id,
    statusTone: item.status === 'READY' ? 'ready' : 'study',
  })

  const { updateStatusHandler } = useCardsContext()

  const wordsLabel = useMemo(() => {
    return declOfNum(item.items.length, [
      t('cards.card_1'),
      t('cards.card_2'),
      t('cards.card_3'),
    ])
  }, [item.items.length, t])

  const dateLabel = useMemo(() => {
    return dateFormat({ date: item.date, type: 'FULL' }) || ''
  }, [item.date])

  const statusDotStyle = useMemo(() => {
    return {
      backgroundColor:
        item.status === 'READY'
          ? theme.colors.palette.item_ready
          : theme.colors.palette.item_study,
    }
  }, [
    item.status,
    theme.colors.palette.item_ready,
    theme.colors.palette.item_study,
  ])

  const pressAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pressScale.value }],
    }
  })

  const animatePressIn = useCallback(() => {
    cancelAnimation(pressScale)
    pressScale.value = withSpring(0.985, {
      damping: 16,
      stiffness: 260,
      mass: 0.8,
    })
  }, [pressScale])

  const animatePressOut = useCallback(() => {
    cancelAnimation(pressScale)
    pressScale.value = withSpring(1, {
      damping: 14,
      stiffness: 220,
      mass: 0.8,
    })
  }, [pressScale])

  const editItem = useCallback(() => {
    setItemEdit(item)
    setShowAddModal(true)
  }, [item, setItemEdit, setShowAddModal])

  const updateStatus = useCallback(async () => {
    if (isAuth && item.id) {
      setIsLoading(true)
      if (item.status === 'READY') {
        await updateStatusHandler(item, 'STUDY')
      } else {
        await updateStatusHandler(item, 'READY')
      }

      setIsLoading(false)
    }
  }, [isAuth, item, updateStatusHandler])

  const deleteItemHandler = useCallback(() => {
    setModalDeleteItem(item)
  }, [item, setModalDeleteItem])

  const onCardPress = useCallback(() => {
    toggleTranslate()
  }, [toggleTranslate])

  const onFooterPress = useCallback(() => {
    toggleFooter()
  }, [toggleFooter])

  return (
    <Animated.View style={pressAnimatedStyle}>
      <TouchableOpacity
        style={styles.item}
        activeOpacity={1}
        onPress={onCardPress}
        onPressIn={animatePressIn}
        onPressOut={animatePressOut}
      >
        <View style={[styles.statusOrb, statusDotStyle]} />

        <View style={styles.header}>
          <View style={styles.headerMain}>
            {!!dateLabel ? <Text style={styles.date}>{dateLabel}</Text> : <></>}

            <View style={styles.metaGroup}>
              <View style={styles.wordsBadge}>
                <Text style={styles.wordsBadgeText}>
                  {item.items.length} {wordsLabel}
                </Text>
              </View>

              {!!language?.emoji && (
                <View style={styles.flagWrapper}>
                  <Text style={styles.flag}>{language.emoji}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <WordItems translateActive={!hiddenTranslate} item={item} />
        </View>

        {hiddenTranslate && (
          <View style={styles.tapHint}>
            <Text style={styles.tapHintText}>
              Нажми на карточку, чтобы открыть перевод
            </Text>
          </View>
        )}

        {!!item.description && !hiddenTranslate && (
          <View style={styles.descriptionBlock}>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.showFooterBtn} onPress={onFooterPress}>
          <Text style={styles.showFooterText}>
            {hiddenFooter ? 'Действия' : 'Свернуть'}
          </Text>
          <Icon
            kind="svg"
            name="dots-vertical-white-64"
            width={10}
            height={10}
            color={theme.colors.icon.primary}
          />
        </TouchableOpacity>

        {!hiddenFooter && (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.footerAction} onPress={editItem}>
              <EditIcon width={25} height={25} />
            </TouchableOpacity>

            {isLoading ? (
              <ActivityIndicator
                size={'small'}
                color={
                  item.status === 'READY'
                    ? theme.colors.palette.item_ready
                    : theme.colors.palette.item_study
                }
              />
            ) : (
              <TouchableOpacity
                style={styles.footerAction}
                onPress={updateStatus}
              >
                <Text style={styles.statusText}>
                  {item.status === 'READY'
                    ? t('cards.study')
                    : t('cards.studied')}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.footerAction}
              onPress={deleteItemHandler}
            >
              <DeleteIcon width={25} height={25} />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  )
}

export default memo(MainItem)
