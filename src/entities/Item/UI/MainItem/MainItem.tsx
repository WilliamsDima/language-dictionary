import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  ActivityIndicator,
  Animated,
  Image,
  TouchableOpacity,
  View,
} from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './MainItem.styles'
import Text from '@/shared/UI/Text/Text'
import { IItem } from '../../model/item'
import DeleteIcon from '@/assets/icons/UI/trash-red-64.svg'
import EditIcon from '@/assets/icons/UI/edit-green-64.svg'
import TranslateIcon from '@/assets/icons/UI/translate-primery-64.svg'
import DotsVerticalIcon from '@/assets/icons/UI/dots-vertical-white-64.svg'
import { useExpandAnim } from '@/shared/hooks/useExpandAnim'
import WordItems from '../WordItems/WordItems'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import { useUserActivity } from '@/shared/hooks/useUserActivity'
import { useCardsContext } from '@/shared/hooks/useCardsContext'
import { useTranslation } from '@/shared/i18n/types'
import { declOfNum } from '@/shared/helpers/textFormat'

type Props = {
  item: IItem
}

const MainItem: FC<Props> = ({ item }) => {
  const { t } = useTranslation()
  const { theme } = useUnistyles()
  const { setModalDeleteItem, setItemEdit, setShowAddModal } = useActions()
  const { firebaseData } = useAppSelector((store) => store.user)
  const { modalDeleteItem } = useAppSelector((store) => store.items)

  const { hidden: hiddenFooter, toggle: toggleFooter } = useExpandAnim()
  const { hidden: hiddenTranslate, toggle: toggleTranslate } = useExpandAnim()

  const [isLoading, setIsLoading] = useState(false)
  const pressScale = useRef(new Animated.Value(1)).current
  const translateGlow = useRef(
    new Animated.Value(hiddenTranslate ? 1 : 0)
  ).current
  const translateGlowLoopRef = useRef<Animated.CompositeAnimation | null>(null)

  styles.useVariants({
    isDeleteActive: item.id === modalDeleteItem?.id,
    statusTone: item.status === 'READY' ? 'ready' : 'study',
  })

  const { updateItemHandler } = useCardsContext()

  const { updateActivity } = useUserActivity()

  const wordsLabel = useMemo(() => {
    return declOfNum(item.items.length, [
      t('cards.card_1'),
      t('cards.card_2'),
      t('cards.card_3'),
    ])
  }, [item.items.length, t])

  const dateLabel = useMemo(() => {
    return item.date ? new Date(item.id).toLocaleDateString() : ''
  }, [item.date, item.id])

  const animatedCardStyle = useMemo(() => {
    return {
      transform: [{ scale: pressScale }],
    }
  }, [pressScale])

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

  const animatedTranslateGlowStyle = useMemo(() => {
    return {
      opacity: translateGlow.interpolate({
        inputRange: [0, 1],
        outputRange: [0, theme.opacity.o100],
      }),
      transform: [
        {
          scale: translateGlow.interpolate({
            inputRange: [0, 1],
            outputRange: [0.92, 1.06],
          }),
        },
      ],
    }
  }, [theme.opacity.o100, translateGlow])

  useEffect(() => {
    if (hiddenTranslate) {
      translateGlowLoopRef.current?.stop()
      translateGlowLoopRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(translateGlow, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(translateGlow, {
            toValue: 0.35,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      )
      translateGlowLoopRef.current.start()
    } else {
      translateGlowLoopRef.current?.stop()
      Animated.timing(translateGlow, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start()
    }

    return () => {
      translateGlowLoopRef.current?.stop()
    }
  }, [hiddenTranslate, translateGlow])

  const animatePressIn = useCallback(() => {
    Animated.spring(pressScale, {
      toValue: 0.985,
      useNativeDriver: true,
      speed: 18,
      bounciness: 4,
    }).start()
  }, [pressScale])

  const animatePressOut = useCallback(() => {
    Animated.spring(pressScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 18,
      bounciness: 6,
    }).start()
  }, [pressScale])

  const editItem = useCallback(() => {
    setItemEdit(item)
    setShowAddModal(true)
  }, [item, setItemEdit, setShowAddModal])

  const updateStatus = useCallback(async () => {
    if (firebaseData && item.idDoc) {
      setIsLoading(true)
      if (item.status === 'READY') {
        await updateItemHandler({ ...item, status: 'STUDY' })
        updateActivity({ repeatCard: true })
      } else {
        await updateItemHandler({ ...item, status: 'READY' })
        updateActivity({ studiedCard: true })
      }

      setIsLoading(false)
    }
  }, [firebaseData, item, updateActivity, updateItemHandler])

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
    <Animated.View style={animatedCardStyle}>
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

              {!!item.language.country && (
                <View style={styles.flagWrapper}>
                  <Image
                    source={{ uri: item.language.country.flag }}
                    style={styles.flag}
                  />
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <WordItems translateActive={!hiddenTranslate} item={item} />

          <View style={styles.translateAction}>
            {hiddenTranslate && (
              <Animated.View
                pointerEvents="none"
                style={[styles.translateGlow, animatedTranslateGlowStyle]}
              />
            )}

            <TouchableOpacity
              style={styles.btnTranslate}
              onPress={toggleTranslate}
              activeOpacity={0.9}
            >
              <TranslateIcon width={25} height={25} />
            </TouchableOpacity>
          </View>
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
          <DotsVerticalIcon width={10} height={10} />
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
