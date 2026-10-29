import React, { FC, memo, useCallback, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import { useTranslation } from '@/shared/i18n/types'
import {
  PracticeModeConfig,
  PracticeModeId,
  hasEnoughCardsForMode,
} from '@/entities/PracticeMode/model/practiceMode'
import { styles } from './PracticeModeItem.styles'

type Props = {
  mode: PracticeModeConfig
  // все карточки пользователя: если их меньше mode.minCards, режим
  // недоступен и показывает подсказку добавить ещё
  cardsCount: number
  onPress: (modeId: PracticeModeId) => void
}

const PracticeModeItem: FC<Props> = ({ mode, cardsCount, onPress }) => {
  const { t } = useTranslation()

  const isComingSoon = useMemo(() => !!mode.isComingSoon, [mode.isComingSoon])

  const isEnough = useMemo(
    () => hasEnoughCardsForMode(mode, cardsCount),
    [mode, cardsCount]
  )

  const isDisabled = useMemo(
    () => isComingSoon || !isEnough,
    [isComingSoon, isEnough]
  )

  // подсказку про карточки показываем только у готовых режимов
  const isHintVisible = useMemo(
    () => !isComingSoon && !isEnough,
    [isComingSoon, isEnough]
  )

  styles.useVariants({ disabled: isDisabled })

  const handlePress = useCallback(() => {
    onPress(mode.id)
  }, [mode.id, onPress])

  return (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.85}
      disabled={isDisabled}
      onPress={handlePress}
    >
      <Text style={styles.icon}>{mode.icon}</Text>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{t(mode.title)}</Text>

          {isComingSoon ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {t('practiceScreen.coming_soon')}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>

        <Text style={styles.description}>{t(mode.description)}</Text>

        {isHintVisible ? (
          <Text style={styles.hint}>
            {t('practiceScreen.not_enough_cards', { count: mode.minCards })}
          </Text>
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default memo(PracticeModeItem)
