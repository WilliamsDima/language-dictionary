import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Animated, TouchableOpacity, View } from 'react-native'
import Modal from '@/shared/UI/Modal/Modal'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import { Icon } from '@/assets/icons/Icon'
import { useActions } from '@/shared/hooks/useActions'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useScaleAnim } from '@/shared/hooks/useScaleAnim'
import { useSubmitAppReviewMutation } from '@/shared/API/services/achievements/AchievementsQuery'
import { setAsyncLocal } from '@/shared/helpers/asyncStorage'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'
import openInBrowser from '@/shared/helpers/openInBrowser'
import { IS_IOS } from '@/shared/helpers/ScaleUtils'
import {
  APP_STORE_REVIEW_LINK,
  GOOGLE_PLAY_REVIEW_LINK,
} from '@/shared/constants/app'
import { REVIEW_RATING_VALUES, SUBMIT_APP_REVIEW_DELAY_MS } from './constants'
import { getReviewEmotion } from './getReviewEmotion'
import ReviewStar from './UI/ReviewStar/ReviewStar'
import { styles } from './ModalAppReview.styles'

type Props = {}

// глобальная модалка "оставить отзыв" — видимость приходит из appSlice,
// поэтому её может открыть и гейт автопоказа на экране достижений
// (useAppReviewGate), и кнопка в настройках (AppReviewButton). Выдача
// достижения app_reviewer происходит через submitAppReview спустя задержку
// после перехода в стор — без реальной проверки того, что отзыв правда
// оставлен (осознанное упрощение по требованиям продукта). Как только
// достижение разблокируется на бэкенде, ModalAchievementUnlocked сам
// покажет поздравление — отдельно поздравлять здесь не нужно
const ModalAppReview: FC<Props> = () => {
  const { setShowAppReviewModal } = useActions()
  const { showAppReviewModal } = useAppSelector((store) => store.app)

  const [rating, setRating] = useState<number | null>(null)

  const [submitAppReview] = useSubmitAppReviewMutation()

  const { getAnimationStyles } = useScaleAnim({ active: showAppReviewModal })

  const submitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const emotion = useMemo(() => getReviewEmotion(rating), [rating])

  const isStoreButtonDisabled = useMemo(() => rating === null, [rating])

  const starItems = useMemo(
    () =>
      REVIEW_RATING_VALUES.map((value) => ({
        value,
        active: rating !== null && value <= rating,
      })),
    [rating]
  )

  // закрытие крестиком/оверлеем — единственное место, которое взводит
  // локальный флаг "видел и закрыл": он не синхронизируется с бэкендом и
  // не переживает переустановку/очистку кэша приложения
  const onClose = useCallback(() => {
    setShowAppReviewModal(false)
    setAsyncLocal(LOCAL_KEYS.appReviewModalDismissed, true)
  }, [setShowAppReviewModal])

  const onSelectRating = useCallback((value: number) => {
    setRating(value)
  }, [])

  const onGoToStore = useCallback(() => {
    const storeLink = IS_IOS ? APP_STORE_REVIEW_LINK : GOOGLE_PLAY_REVIEW_LINK

    openInBrowser(storeLink)
    setShowAppReviewModal(false)

    submitTimeoutRef.current = setTimeout(() => {
      submitAppReview()
    }, SUBMIT_APP_REVIEW_DELAY_MS)
  }, [setShowAppReviewModal, submitAppReview])

  useEffect(() => {
    if (!showAppReviewModal) {
      setRating(null)
    }
  }, [showAppReviewModal])

  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) clearTimeout(submitTimeoutRef.current)
    }
  }, [])

  return (
    <Modal
      visible={showAppReviewModal}
      transparent
      onRequestClose={onClose}
      animationType="fade"
    >
      <TouchableOpacity
        style={styles.wrapper}
        activeOpacity={1}
        onPress={onClose}
      >
        <Animated.View style={[getAnimationStyles(), styles.wrapperContainer]}>
          <TouchableOpacity style={styles.container} activeOpacity={1}>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Icon kind="svg" name="close-red-64" width={16} height={16} />
            </TouchableOpacity>

            <Text style={styles.title}>Нравится Nori?</Text>
            <Text style={styles.subtitle}>
              Оцените приложение — это помогает нам становиться лучше
            </Text>

            <View style={styles.stars}>
              {starItems.map((item) => {
                return (
                  <ReviewStar
                    key={item.value}
                    value={item.value}
                    active={item.active}
                    onPress={onSelectRating}
                  />
                )
              })}
            </View>

            {rating ? <Text style={styles.emotion}>{emotion}</Text> : <></>}

            <Button
              type="PRIMERY"
              style={styles.btn}
              disabled={isStoreButtonDisabled}
              onPress={onGoToStore}
            >
              Оставить отзыв
            </Button>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  )
}

export default memo(ModalAppReview)
