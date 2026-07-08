import React, { FC, useCallback } from 'react'
import { View } from 'react-native'
import { styles } from './AppReviewButton.styles'
import Button from '@/shared/UI/Button/Button'
import { useActions } from '@/shared/hooks/useActions'
import { useAppReviewAchievement } from '@/shared/hooks/useAppReviewAchievement'
import { useTranslation } from '@/shared/i18n/types'

// кнопка открывает ModalAppReview вручную. Скрыта целиком, если достижение
// app_reviewer уже разблокировано — второй раз просить отзыв незачем
const AppReviewButton: FC = () => {
  const { t } = useTranslation()
  const { setShowAppReviewModal } = useActions()

  const { isUnlocked } = useAppReviewAchievement()

  const onPress = useCallback(() => {
    setShowAppReviewModal(true)
  }, [setShowAppReviewModal])

  return isUnlocked ? (
    <></>
  ) : (
    <View style={styles.container}>
      <Button
        classes={{ btn: styles.btn, textBtn: styles.btnText }}
        onPress={onPress}
      >
        {t('settingsScreen.rate_app')}
      </Button>
    </View>
  )
}

export default AppReviewButton
